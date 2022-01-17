
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserListItem from './UserListItem';
import { useHistory } from "react-router-dom";
import UserImg from '../asset/image/userimg.png'

import axios from 'axios';

export default function SideDrawer() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const { user, setSelectedChat, chats, setChats } = ChatState();
    const [brokerList, setBrokerList] = useState("")
    const history = useHistory();


    //function for logout
  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo");
    history.push("/");
  };


    const handleSearch = async () => {
        if (!search) {
            //error handling
            console.log("plz fill input")
            return;
        }
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            };
            // console.log("sidedrewerconfig", config)
            const { data } = await axios.get(`http://localhost:3111/allUsers?search=${search}`, config);
            console.log("getalluser data", data)
            setSearchResult(data);
        } catch (error) {
            console.log("errror", error)
        }
    };

const allBroker = async () => {
    await axios.get("http://localhost:3111/getAllBroker").then(res => {
        console.log(res.data.data)
        setBrokerList(res.data.data)
    }).catch(err => {
        console.log(err)
    })
}


    //createChat 
    const accessChat = async (userId) => {
        // console.log("accessdata userId", userId);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
                },
            };
            // console.log("con", config)
            const { data } = await axios.post(`http://localhost:3111/chat/accesschat2`, { userId }, config);
            console.log("data", data)   
            console.log("chats",chats)
            if (!chats.find((c) =>  c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);


        } catch (error) {
            //error handing
            console.log(error)
        }
    };




    return (
        <>


            <section className="bgcolor-lgrey py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 d-flex ">
                            <input className="form-control mr-sm-2 serarchbar" type="search" placeholder="Search" data-bs-toggle="offcanvas" href="#offcanvasExample" />
                            <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
                         
                    
                       <div className='logoutbtn'>
                            <button id="userId" href="fabricview.html?id=" className="btn btn_info">View on Fabric</button>
                            <button className="btn btn_info  text-white" onClick={logoutHandler}>Logout</button>
                         </div>
                         <div>
                         <img className='profile_pic' src={UserImg}/>
                            <p>{user.data.first_name}</p>
                         </div>
                          
                
                            
                   
                    </div>
                </div>
                </div>
            </section>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Search User</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div className="offcanvas-body" >
                    <div className='col-lg-12 px-0 '>
                        <div className="input-group mb-3 d-flex ">
                            <input type="text" className="form-control" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <div className="input-group-append">
                                <button className="btn btn-primary text-white" type="button" onClick={handleSearch}>Go</button>
                            </div>
                            <button className="btn btn-primary text-white" type="button" onClick={allBroker} style={{marginLeft:"10px"}}>ViewBroker</button>
                        </div>
                        <div>
                        
                        </div>
                    </div>

                    {
                        searchResult.map((user) => {
                            // console.log("searchlist",user)
                            return (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}>
                                </UserListItem>
                            )
                        })
                    }
                {/* {brokerList.map((e) => {

                })} */}
                    

                </div>
            </div>








        </>
    )
}
