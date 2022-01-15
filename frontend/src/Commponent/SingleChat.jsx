import React,{useState,useEffect} from 'react'
import { getSender } from '../common/Config'
import { ChatState } from '../Context/ChatProvider'
import ScrollableFeed from 'react-scrollable-feed'
import {isSameSenderMargin,isSameUser} from '../common/Config'
import axios from 'axios';
import io from 'socket.io-client'

const ENDPOINT ="http://localhost:3111";
var socket,selectedChatCompare;




export default function SingleChat( { fetchAgain, setFetchAgain }) {
    const { selectedChat, user, setSelectedChat } = ChatState()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected,setSocketConnected] = useState(false)


    const fetchMessages = async () => {
        if (!selectedChat) return;
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          };
          const { data } = await axios.get(
            `http://localhost:3111/message/allMessages/${selectedChat._id}`,
            config
          );
        //  console.log("fetchmessaged data:",data)
          setMessages(data);
          socket.emit("Join chat",selectedChat._id)
        } catch (error) {
             console.log("fectchcht error:",error)
      };

    }
    fetchAgain, 
    useEffect( () => {
      socket = io(ENDPOINT);
      socket.emit("setup",user);
      socket.on("connection",() => setSocketConnected(true))
      },[])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
      }, [selectedChat]);

    useEffect(() => {
     
        socket.on("message recieved",(newMessageRecieved) => {
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
        {
          //give notification
        }else{
          setMessages([...messages,newMessageRecieved])
        }

        })
   
    
    })


     

 const sendMessage = async (event) => {
       if(event.key === "Enter" && newMessage){     //keyborad === enter and massesage
            try{
                const config = {
                    headers: {
                     "Content-Type":"application/json",
                      Authorization: `Bearer ${user.accessToken}`,
                    },
                  }; 
                  setNewMessage("")
                const data = await axios.post("http://localhost:3111/message/sendMessage",{
                    content:newMessage,
                    chatId:selectedChat._id
                },config)
                console.log("sendMessage data:",data)
                socket.emit("new message",data);
                setNewMessage("")
            }catch(error){
                console.log("sendMessage_error:",error)
            }
       }
  };


  const tyingHandler = async (e) => {
    setNewMessage(e.target.value);

};
    return (
        <div className='chatbox'>

            {selectedChat ? (<>
                <div className='chatbox_heading'>
                    <span className='senderName'>  {getSender(user, selectedChat.users).toUpperCase()}</span>
                    <hr />
                </div>
              
                    {/* Meessage Here */}
                   <div className='messages_box'>
                   <ScrollableFeed>
                      {messages && messages.map((m,i) => {
                          return(
                            <div key={m._id}>
                              <p className='messages' style={{ backgroundColor: `${m.sender._id === user.data._id ? "lightgray" : "#0b5ed7"}`,
                                                               color:`${m.sender._id === user.data._id ? "black" : "white"}`,
                                                               marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                                                               marginTop: isSameUser(messages, m, i, user.data._id) ? 3 : 10,
                                                             }} >
                                {m.content}
                              </p>
                            </div>
                           
                          )
                         
                      })}

 {/* <ScrollableChat messages={messages} /> */}
                   </ScrollableFeed>
            
                   </div>
                    <div onKeyDown={sendMessage} isRequired className='inputmessage'>
                          <input  value={newMessage} onChange={tyingHandler} class="form-control form-control-lg" type="text" placeholder="Enter Message" aria-label=".form-control-lg example" />
                    </div>
              

            </>) : (<div className='chatting_title'> Click on a user to Start Chatting</div>)}
        </div>


    )
}
