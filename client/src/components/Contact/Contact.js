import React,{useEffect, useState} from 'react';
import "../Contact/Contact.css";
import FooterTwo from '../header-footer/FooterTwo'
import {useHistory} from 'react-router-dom'

function Contact() {
    const history=useHistory();
    const [userData, setUserData] = useState({name:"",email:"",country:"",message:"",rating:""});
    const callContactPage=async()=>{
        try {
            const res=await fetch('/getdata',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data=await res.json();
           
            setUserData({...userData,name:(data.firstname+" "+data.lastname),email:data.email});

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login");
        }
    }


    useEffect(() => {
        callContactPage();
   
    }, []);


    const checkContactInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setUserData({...userData,[name]:value});

    }
    
    const contactForm=async(e)=>{
        e.preventDefault();
        const {name,email,country,message,rating}=userData;

        const res=await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,country,message,rating
            })
        });

        const data=await res.json();
        if(res.status===400){
            alert('Please enter the required fields');
            return;
        }
        if(!data){
            console.log("Request failed!!");
        }
        else{
            alert(`Message sent`);
            setUserData({...userData,country:"",message:"",rating:""});
        }
    }
    return (
        <>
        <div >
            <h1 align="center" >Contact Us</h1>
            <div className="formDiv">
                <form method="POST"   >
                    <div>
                        <div className="mb-3" >
                            <label for="exampleFormControlInput1" className="form-label">Full Name*</label>
                            <input align="center" type="text" name="name" value={userData.name} onChange={checkContactInput} className="form-control" id="exampleFormControlInput1" autoComplete="off" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email address*</label>
                            <input type="email" name="email" value={userData.email} onChange={checkContactInput} className="form-control" id="exampleFormControlInput1" autoComplete="off" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Country*</label>
                            <input type="text" name="country" value={userData.country} onChange={checkContactInput} className="form-control" id="exampleFormControlInput1" autoComplete="off" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">A message for us*</label>
                            <textarea className="form-control" name="message" value={userData.message} onChange={checkContactInput} id="exampleFormControlTextarea1" autoComplete="off" rows="3"></textarea>
                        </div>

                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Please rate us below</label>
                            <div >
                                <label className="ratingCheck">
                                    <input  type="radio" name="rating" value="loved" onClick={checkContactInput}/>
                                    <p>😍</p>
                                    <p>Loved</p>
                                </label>

                                <label className="ratingCheck">
                                    <input type="radio" name="rating" value="good"  onClick={checkContactInput}/>
                                    <p>😄</p>
                                    <p>Good</p>
                                </label>

                                <label className="ratingCheck">
                                    <input type="radio" name="rating" value="average" onClick={checkContactInput} />
                                    <p>🙂</p>
                                    <p>Average</p>
                                </label>

                                <label className="ratingCheck">
                                    <input type="radio" name="rating" value="bad" onClick={checkContactInput} />
                                    <p>🙁</p>
                                    <p>Need to improve</p>

                                </label>
                            </div>
                        </div>

                        <div align="center">
                            <button className="buttonShift" type="submit" onClick={contactForm}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        

        </>
    )
}

export default Contact

