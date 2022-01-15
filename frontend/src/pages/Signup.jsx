
import React,{useState,useEffect} from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import $ from 'jquery';


export default function Signup() {
const [role, setrole] = useState("");
 const [name, setName] = useState("");
 const [lastname, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmpassword, setConfirmPassword] = useState("");
 const [pic, setPic] = useState("");
//  const [error,setError] =useState("")
 
 let Histroy = useHistory();

//for post image
 const postDetails = (pics) => {
 }

useEffect(() => {
    $("#passwordmismatch").hide()
    // $("#firstName").hide()
    // $("#lastName").hide()
    $("#email1").hide()
    $("#password1").hide()
    $("#password2").hide()
    $("#rolecheck").hide()
    $("#emailcheck").hide();
}, [])

$(".validate").focus(function(){
    $("#passwordmismatch").hide();
    $("#firstName").hide();
    $("#lastName").hide();
    $("#email1").hide();
    $("#password1").hide();
    $("#password2").hide();
    $("#rolecheck").hide();
    $("#emailcheck").hide();
})
 
  const submitHandler =  async () => {
    const article = { role:role, first_name:name, last_name:lastname, email:email, password:password, confirmpassword:confirmpassword };
    // if(article.role == undefined || article.role == null){
    //     $("#rolecheck").show()
    // }
    if(article.first_name == undefined || article.first_name == ""){
        $("#firstName").show()
    }
    if(article.email == undefined || article.email == ""){
        $("#email1").show();
    }
    if(article.password == undefined || article.password == ""){
        $("#password1").show();
    }
    if(article.confirmpassword == undefined || article.confirmpassword == ""){
        $("#password2").show()
    }
    axios.post('http://localhost:3111/userSignup', article)
        .then((response)=>{
            console.log("response",response)
           if(response.data.statusCode == 401){
              $("#passwordmismatch").show()
           }if(response.data.statusCode == 402){
                $("#emailcheck").show() 
           }if(response.data.statusCode == 403){
                $("#rolecheck").show()
           }
           if(response.data.statusCode ==200){
                Histroy.push("/")
           }
        })
 }

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 col-sm-12 mx-auto">
                            <div className="authentication">
                                <div className="mb-12 sm:mb-8">
                                    <h2 className='text-center'>Sign Up</h2>
                                </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">*Role select</label>
                                        <select className="form-control validate" id="role" name="role"  onChange={(e) =>setrole(e.target.value)} >
                                            <option>Select Role</option> 
                                            <option>Client</option>
                                            <option>Broker</option>
                                            <option>Supervisor</option>
                                        </select>
                                        <p className="error"  id="rolecheck">*Please select role</p>
                                    </div>
                                    <div className="form-group"  >
                                        <label >*First Name</label>
                                        <input required type="text" 
                                               className="form-control validate" 
                                               name="first_name" 
                                               id="first_name" 
                                               placeholder="Enter your firstname" 
                                               onChange={(e) =>setName(e.target.value)
                                               }
                                           
                                             />
                                    <p className='error' id="firstName"> *Enter Your FirstName</p>
                                    </div>

                     
                        
                                    <div className="form-group needs-validation" novalidate>
                                        <label className="fw-regular" for="exampleInputEmail1">Last Name</label>
                                        <input type="text" className="form-control" name="last_name" id="validationCustom01" aria-describedby="emailHelp" required
                                            placeholder="Enter your lastname" onChange={(e) =>setLastName(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="fw-regular" for="exampleInputEmail1">*Email</label>
                                        <input type="email" className="form-control validate" name="email" id="email" aria-describedby="emailHelp"
                                            placeholder="Enter your Email" onChange={(e) =>setEmail(e.target.value)} required />
                                         <p className='error' id="email1">*Enter Valid Email</p>
                                         <p className='error' id="emailcheck">*Email already exist</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="fw-regular w-100" for="exampleInputPassword1">*Password </label>
                                        <input type="password" className="form-control validate" name="password" id="password"
                                            placeholder="Enter 6 character or more" onChange={(e) =>setPassword(e.target.value)} required/>
                                            <p className='error' id="password1"> *Enter Password</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="fw-regular" >*Confirm Password</label>
                                        <input type="password" className="form-control validate" name="confirmpassword" id="confirmpassword" aria-describedby="emailHelp"
                                            placeholder="Confirm Password" onChange={(e) =>setConfirmPassword(e.target.value)} required/>
                                        <p className='error' id="passwordmismatch">*Password Mistmatch</p>
                                        <p className='error' id="password2">*Confirm Password required</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="fw-regular">Upload your picture</label>
                                        <input type="file" accept='image/*' className="form-control validate" name="pic" id="pic" 
                                            onChange={(e) =>postDetails(e.target.files[0])}  />
                                    </div>
                                    <button className="button uppercase w-100 text-center" 
                                            type="submit" 
                                            onClick={submitHandler}
                                            >Signup</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}




