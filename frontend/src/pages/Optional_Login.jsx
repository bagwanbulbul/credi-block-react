import React, { useState,useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Link ,useHistory } from 'react-router-dom';
import axios from 'axios';


export default function Optional_Login() {


    // useEffect(() => {
    //     const user = JSON.parse(sessionStorage.getItem("userInfo"))
    //     if(user){
    //         History.push("/chat")
    //     }
    // },[History]);


    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let History= useHistory()


     var url_string = window.location.href;
     const splitUrl = url_string.split('/')
     var role = splitUrl[4]
     var error = "please fill email and password"

  const submitHander = async () => {
    // console.log(role)
    setLoading(true);
    if (!email || !password) {
        console.log("loginerror",error)
        setLoading(false);
      return;
    }
        try {
         const config = {
               headers: {
               "Content-type": "application/json",
              },
           };
      const { data } = await axios.post("http://localhost:3111/userLogin?" + role, { email, password }, config  );
      console.log("login data" ,data)
     sessionStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
     History.push("/chat");
    } catch (error) {
        console.log("error",error)
        setLoading(false);
    }
  };


    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 col-sm-12 mx-auto">
                            <div className="authentication ">
                                <div className="front-side">
                                    
                                        <div className="mb-12 sm:mb-8">
                                            <h2 className='text-center'>Log In</h2>
                                            <p className="mt-2 fw-light color-text">Doesn't have an account yet? <Link to ="/signup"
                                                className="underline color-away">Sign Up</Link></p>
                                        </div>
                                      
                                        <div className="form-group">

                                            <div className="form-group">
                                                <label className="fw-regular">Email Address</label>
                                                <input type="email" className="form-control validate" name="email" id="exampleInputEmail1"
                                                 placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}  value={email} />
                                            </div>
                                       
                                     
                                            <div className="form-group">
                                                <label className="fw-regular w-100" >Password <a href="javascript:;"
                                                    className="underline color-away float-right" id="flip" >Forgot Password?</a></label>
                                                <input type="password" className="form-control validate" name="password" id="exampleInputPassword1"
                                                    placeholder="Enter 6 character or more" onChange={(e) => setPassword(e.target.value)}    value={password}/>
                                            </div>   

                                   
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label fs-14" >Remember me</label>
                                            </div>

                                            <button className="button uppercase w-100 text-center" onClick={submitHander}  isLoading={loading}>Login</button>
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}



