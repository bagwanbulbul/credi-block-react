import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatProvider'
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../common/Config";

export default function ScrollableChat({ messages }) {
    const { user } = ChatState()
    return (
        <>
            <ScrollableFeed>

                {messages && messages.map((m, i) => {
                    console.log("mmmmm",m)
                    console.log("senderId",m.sender._id)
                    console.log("userId",user.data._id )
                    
                    return (
                        <div className='' key={m._id}>

                             <span 
                               style={{backgroundColor:"#BEE3F8",  
                                width: "fit-content",
                                margin: "34px",
                                padding: "12px",     
                            }} >
                               {m.content}    
                             </span>


                            {/* <span
                                style={{
                                    backgroundColor: `${m.sender._id === user.data._id ? "#BEE3F8" : "#B9F5D0"
                                        }`,
                                    marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                                    marginTop: isSameUser(messages, m, i, user.data._id) ? 3 : 10,
                                    borderRadius: "20px",
                                    padding: "5px 15px",
                                    maxWidth: "75%",
                                }}
                            >
                                {m.content}
                            </span> */}
                       
                        </div>
                    )

                })}

            </ScrollableFeed>
        </>
    )
}
