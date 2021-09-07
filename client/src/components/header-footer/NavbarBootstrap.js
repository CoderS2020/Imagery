import React, { useState, useEffect, useContext } from 'react';
import './NavbarBootstrap.css';
import '../Login-Signup/Signup.css';
import '../Login-Signup/Login.css';
import GoogleLogin from 'react-google-login';
import { UserContext, InputContext } from "../../App";
import Logo1 from "./Imagery Full logo edit.png";
import defaultLogo from "../Profile/defaultprofile1.png"
import { Link, useHistory } from 'react-router-dom';
import {HiSearch} from "react-icons/hi";

function NavbarBootstrap() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext); //to check if the user is signed in or not
  const { state1, dispatch1 } = useContext(InputContext); //to check the input in search bar

  const [profilephoto, setProfilephoto] = useState("");
  var profileImgLink = "";

  const HomeLoginCheck = () => {
    if (state === true) {
      return (
        <>
          <Link className="navbar-brand" to="/homelogin" >
            <img src={Logo1} className="logoSizing" alt="Logo" />
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link className="navbar-brand" to="/" >
            <img src={Logo1} className="logoSizing" alt="Logo" />
          </Link>
        </>
      )
    }
  }

  //Different menus rendered if user is signed in or not
  const RenderMenu = () => {
    if (state === true) {
      
      return (
        <>
          <li className="nav-item" style={{ zIndex: "100" }}>
            <Link className="nav-link navLink about today" aria-current="page" to="/today">&nbsp;&nbsp;Today</Link>
          </li>
          <li className="nav-item" style={{ zIndex: "90" }} >
       
          <div className="nav-link  ">
            <div className="dropdown profilePicdropdown" style={{ zIndex: "10" }}>
              <a className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {(profilephoto === "" || profilephoto === undefined || profilephoto === null) ? <img src={defaultLogo} className="defaultLogoSizing" /> : <img src={profilephoto} className="defaultLogoUserSizing" />}
              </a>
              <ul className="dropdown-menu dropdown-menu1" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" to={`/profile`}>My Profile</Link></li>
                <li><Link className="dropdown-item" to="/settings">Account settings</Link></li>
                <li><Link className="dropdown-item" to="/myuploads">My uploads </Link></li>
                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>


              </ul>
            </div>
          </div>
          </li>
        </>
      )
    }
    else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link navLink about" aria-current="page" to="/about">About us</Link>
          </li>
          <li className="nav-item">

            <a className="nav-link navLink signup" style={{  cursor: "pointer" }} onClick={signupModal}>Signup</a>
          </li>
          <li className="nav-item">
            <div className="nav-link navLink login" style={{ cursor: "pointer" }} onClick={loginModal}>Login</div>
          </li>

        </>
      )
    }
  }

  //useState Hooks
  const [input, setInput] = useState("");
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "", password: "", age: "" });
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [id, setId] = useState();
  const [loginCondition, setLoginCondition] = useState(false);
  const [signupCondition, setSignupCondition] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [passwordrestUser, setPasswordrestUser] = useState("");
  
  
  //redirect to login
  const reDirectLogin = (e) => {
    document.getElementById('clickButtonSignup').click();
    document.getElementById('loginClick').click();

  }
  //close sign up Modal
  const signUpClose = (e) => {
    document.getElementById('clickButtonSignup').click();

  };
  
  //close login Modal
  const loginClose = (e) => {
    document.getElementById('loginClick').click();

  }

  //reset the password
  const passwordResetModal = (e) => {
    loginClose();
    document.getElementById('forgotPasswordClick').click();
    

  }

  //login modal
  const loginModal = (e) => {
    if (signupCondition) {
      setSignupCondition(false);
      document.getElementById('clickButtonSignup').click();
    }
    document.getElementById('loginClick').click();
    setLoginCondition(false);

  }

  //sign up modal
  const signupModal = (e) => {
    if (loginCondition) {
      document.getElementById('loginClick').click();
      setLoginCondition(false);
    }
    document.getElementById('clickButtonSignup').click();
    setSignupCondition(false);
  }

  // updating useState hooks once input is filled
  let name, value;
  const handleInputvalue = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCredentials("");
    setUser({ ...user, [name]: value });

  };

  let emailhandle, passwordhandle;
  const handleLoginvalue = (e) => {
    emailhandle = e.target.name;
    passwordhandle = e.target.value;
    setCredentials("");
    setLoginUser({ ...loginUser, [emailhandle]: passwordhandle });

  };
  
  const handleresetPasswordvalue=(e)=>{
    setPasswordrestUser(e.target.value);
  };
  var isEmailValid=false;

  //Function called once sign up button is pressed
  const postSignupData = async (e) => {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email))) //to check regex
    {
      alert('You have entered an invalid Email.');
      return;
    }
    

    if(user.age<12){
      alert('You have to be atleast 12 years old.');
      return;
    }

    e.preventDefault();
    var { firstname, lastname, email, password, age } = user;
    firstname = String(firstname).trim();
    lastname = String(lastname).trim();

    let d = new Date;
    let time = String(String(d.getDate()) + String(d.getMonth()) + String(d.getFullYear()) + String(d.getHours()) + String(d.getMinutes()) + String(d.getSeconds()));
    let creamzoId = (String(firstname) + time).trim();

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname, lastname, email, password, age, creamzoId
      })
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert(data.error);
      console.log("Invalid registration");
    }
    else {
      window.alert("An email has been sent to the entered email address,please verify.");
 
      signupModal();

    }
  };

  //function called after login in button is pressed
  const postLoginData = async (e) => {

    e.preventDefault();
    const { email, password } = loginUser;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();
    if (res.status == 400 || !data) {
      setCredentials("Invalid credentials");
      window.alert("Invalid credentials");
    
    }
    else {
      dispatch({ type: "USER", payload: true });
  
      setProfilephoto(data.profilepic);
      profileImgLink = data.profilepic;

      setId(data._id);
      window.alert("Login Successful");

      loginClose();
      history.push('/homelogin');

    }
  };

  //reset the password
  const postPasswordReset=async(e)=>{
    e.preventDefault();
    const res = await fetch("/forgotPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email:passwordrestUser
      })
    });

    const data = await res.json();

    if (res.status != 200  || !data) {
      window.alert('No such email address exist in the database');
      
    }
    else {
      window.alert(data);    
      passwordResetModal();


    }
  }

  //google signup
  const responseSuccessGoogle = async (response) => {
  
    const res = await fetch("/googlesignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: response.tokenId
      })

    });
    const data = await res.json();

    if(data.messageSuccess){

      alert(data.messageSuccess);
    }
    else{
      dispatch({ type: "USER", payload: true });
 
      setProfilephoto(data.profilepic);
      profileImgLink = data.profilepic;

      setId(data._id);
      window.alert("Login Successful");

      history.push('/homelogin');

    }



  };

  
  //If google login is successfull
  const responseSuccessGoogle1 = async (response) => {
    
    const res = await fetch("/googlelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: response.tokenId
      })

    });
    const data = await res.json();

    if(data.message){

      alert(data.message);
    }
    else{
      dispatch({ type: "USER", payload: true });

      setProfilephoto(data.profilepic);
      profileImgLink = data.profilepic;

      setId(data._id);
      window.alert("Login Successful");


      history.push('/homelogin');

    }





  };
  //If some error occurs in google signup
  const responseErrorGoogle = (response) => {
    alert('Something went wrong!!');
  }

  //to fetch user's data
  const fetchUserData = async () => {
    try {
        const res = await fetch('/getdata', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        setProfilephoto(data.profilepic);


        if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
        }

    } catch (error) {
        console.log(error);
        
    }
   

}

useEffect(() => {
    fetchUserData();
 
}, []);








  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <HomeLoginCheck />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="input-group ">
                <span className="input-group-text search-bars placeicons1 mt-2" id="basic-addon1"><HiSearch size={22} className="searchIcon" /></span>
                <input type="text" className="form-control placeicons search-bars mt-2" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => dispatch1({ type: "INPUT", payload: e.target.value })}/>
              </div>
            
     
            <div >
              <ul className="navbar-nav navul ">
                <RenderMenu />

              </ul>
            </div>

          </div>
        </div>
      </nav>



      {/* Sign Up Modal */}

      <div>
        <button type="button" className="btn btn-primary hidebtn" data-bs-toggle="modal" id="clickButtonSignup" data-bs-target="#exampleModal" data-bs-whatever="@fat"></button>



        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog " >
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header">
                <h3 className="modal-title heading" id="exampleModalLabel">Welcome to Imagery</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>
              <div className="modal-body" >
                <p>Already have an account? <span onClick={reDirectLogin} style={{ color: "red", cursor: "pointer" }} >Login</span></p>

                <form className="row g-3" method="POST">
                  <div className="col-md-6">
                    <label htmlFor="exampleFormControlInput1" className="form-label">First name</label>
                    <input type="text" name="firstname" className="form-control" id="exampleFormControlInput1" autoComplete='off' value={user.firstname} onChange={handleInputvalue} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last name</label>
                    <input type="text" name="lastname" className="form-control" id="exampleFormControlInput1" autoComplete='off' value={user.lastname} onChange={handleInputvalue} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <div className="input-group">
                      <input type="email" name="email" className="form-control"  id="exampleFormControlInput1" autoComplete='off' value={user.email} onChange={handleInputvalue} aria-describedby="inputGroupPrepend2" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleFormControlInput1" autoComplete='off' value={user.password} onChange={handleInputvalue} required />
                  </div>

                  <div className="col-md-6 container">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
                    <input type="number" name="age" className="form-control" id="exampleFormControlInput1" autoComplete='off' value={user.age} onChange={handleInputvalue} required />
                  </div>


                  <div className="col-12">
                    <button className="btn btn-primary submitBtn" type="submit" onClick={postSignupData}>Sign up</button>
                  </div>
                  <div className="col-md-6 container orCss" >
                    OR
          </div>
                  <div className="col-12" onClick={signUpClose}>
                    <GoogleLogin
                      clientId=""
                      buttonText="Continue with Google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseErrorGoogle}
                      cookiePolicy={'single_host_origin'}
                      className="btn btn-primary googleButton"
                    />
                    {/* <button className="btn btn-primary googleButton" type="submit">Continue with Google</button> */}
                  </div>
                  <p className="privacy">By continuing, you agree to Creamzo's <Link to="/privacy">Terms of Service</Link>, <Link to="/cookiesPolicy">Privacy policy.</Link></p>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Login Modal */}



      <div>
        <button type="button" className="btn btn-primary hidebtn" data-bs-toggle="modal" id="loginClick" data-bs-target="#exampleModalse" data-bs-whatever="@ft"></button>

        <div className="modal fade xyz" id="exampleModalse" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog " >
            <div className="modal-content" style={{ borderRadius: "10px" }} >
              <div className="modal-header">
                <h3 className="modal-title heading" id="exampleModalLabel">Welcome to Imagery</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" method="POST">

                <form className="row g-3">

                  <div className="col-md-12">
                    <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                    <div className="input-group">
                      <input type="email" name="email" value="" className="form-control" id="validationDefaultUsername" autoComplete='off' value={loginUser.email} onChange={handleLoginvalue} aria-describedby="inputGroupPrepend2" required />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="validationDefault03" className="form-label">Password</label>
                    <input type="password" name="password" value="" className="form-control" id="validationDefault03" autoComplete='off' value={loginUser.password} onChange={handleLoginvalue} required />
                    <div style={{display:"flex"}}>
                    
                    <p onClick={passwordResetModal} className='btnresetpassword1' style={{color:"red"}}>Reset Password</p>
                    </div>

                  </div>


                  <div className="col-12">
                    <button className="btn btn-primary submitBtn btnLogin " type="submit" onClick={postLoginData}>Log in</button>
                  </div>
                  <div className="col-md-6 container orCss" >
                    OR
          </div>
                  <div className="col-12" onClick={loginClose}>
                    <GoogleLogin
                      clientId=""
                      buttonText="Continue with Google"
                      onSuccess={responseSuccessGoogle1}
                      onFailure={responseErrorGoogle}
                      cookiePolicy={'single_host_origin'}
                      className="btn btn-primary googleButton"
                    />
                  </div>
                  <p className="privacy">By continuing, you agree to Imagery's <Link to="/privacy">Terms of Service</Link>, <Link to="/cookiesPolicy">Privacy policy</Link>.</p>
                  <p className="signuplink">Don't have an account?  <span onClick={reDirectLogin} style={{ color: "red", cursor: "pointer" }} >Signup</span></p>


                </form>
              </div>

            </div>
          </div>
        </div>

      </div>


      <div>
        <button type="button" className="btn btn-primary hidebtn" data-bs-toggle="modal" id="forgotPasswordClick" data-bs-target="#exampleModalsese" data-bs-whatever="@ft"></button>

        <div className="modal fade xyz " id="exampleModalsese" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog passwordModal" >
            <div className="modal-content passwordModal" style={{ borderRadius: "10px" }} >
              <div className="modal-header">
                <h3 className="modal-title heading headingForgotPassword " id="exampleModalLabel">Reset Password</h3> 
                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" method="PUT">

                <form className="row g-3">

                  <div className="col-md-12 ">
                    <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                    <div className="input-group">
                      <input type="email" name="email" value="" className="form-control" id="validationDefaultUsername" autoComplete='off' value={passwordrestUser} onChange={handleresetPasswordvalue} aria-describedby="inputGroupPrepend2" required />
                    </div>
                  </div>
                  


                  <div className="col-12 ">
                    <button className=" btnresetpassword btn btn-primary submitBtn  " style={{marginLeft: "59%"}} type="submit" onClick={postPasswordReset}>Reset Password</button>
                  </div>
                  
                  
                  
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default NavbarBootstrap
