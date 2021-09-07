import React, { useState, useEffect,useContext } from 'react'
import "./Editprofile.css";
import {useHistory} from "react-router-dom";

import profilepic from "./defaultprofile1.png";
import { UserContext } from "../../App";


const Editprofile = () => {
    const history=useHistory();
 
    const [userImage, setuserImage] = useState(profilepic);
    const [profilePicUrl,setProfilePicUrl]=useState("");
    const [selectedfile, setSelectedfile] = useState();
    const [preview, setPreview] = useState();
    const { state, dispatch } = useContext(UserContext);

    
    const [userData, setUserData] = useState({firstname:"",lastname:"",email:"",creamzoId:"",about:"",location:"",gender:"",profilepic});
    var imageurl="";
    const getUserData=async()=>{
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
          
            setUserData({...userData,profilepic:data.profilepic,creamzoId:data.creamzoId,firstname:data.firstname,lastname:data.lastname,email:data.email,profilepic:data.profilepic,about:data.about,location:data.location,gender:data.gender});
            imageurl=JSON.stringify(data.profilepic);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login");
        }
        dispatch({ type: "USER", payload: true });

    };

    const checkAccountInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setUserData({...userData,[name]:value});

    };

    

let profileUrl="";
const imagetoCloudinary=async (e)=>{

        e.preventDefault();
        // Storing image to cloudinary  

            const data = new FormData();
            data.append("file", profilePicUrl);
            data.append("upload_preset", "imagery");
            data.append("cloud_name", "dry4vwhik");
            await fetch("https://api.cloudinary.com/v1_1/dry4vwhik/image/upload", {
                method: "POST",
                body: data

            })
                .then(res => res.json())
                .then(data => {
               
                    profileUrl=data.url;
                 
                    
                    setUserData({...userData,profilepic:data.url});
                   
                })
                .catch(err => {
                    console.log(err);
                })    
                
                postProfileData();
    
}



    

    const postProfileData =async (e) => {

      
        const {firstname,lastname,email,about,location,gender}=userData;
        let profilepic=profileUrl;
        const res=await fetch('/updateprofile',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstname,lastname,email,about,location,gender,profilepic
            })
        });

        const data=await res.json();
        if(!data){
            console.log("Request failed!!");
        }
        else{
          
            alert(`Profile updated successfully!!`);
        
        }


    }

    useEffect(() => {
        if (!selectedfile) {
            setPreview(undefined); return;
        }

        const objectUrl = URL.createObjectURL(selectedfile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL
    }, [selectedfile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedfile(undefined);
            return;
        }
        setSelectedfile(e.target.files[0]);
    };

useEffect(() => {
    getUserData();
}, [])


    return (
        <>
            <h1 className="headingEdit">Profile</h1>

            <form class="row g-3">
                <div className="col-md-6">
                    <div className="row m-3">
                        <div class="col-md-6 ">
                            <label for="validationDefault01" class="form-label">First name*</label>
                            <input type="text" class="form-control" name="firstname" id="validationDefault01" autoComplete="off" value={userData.firstname} required  onChange={checkAccountInput}/>
                        </div>
                        <div class="col-md-6 ">
                            <label for="validationDefault02" class="form-label">Last name*</label>
                            <input type="text" class="form-control" name="lastname" id="validationDefault02" autoComplete="off" value={userData.lastname} required  onChange={checkAccountInput}/>
                        </div>
                    </div>

                    <div className="row m-3">
                        <div class="col-md-6">
                            <label for="validationDefault03" class="form-label">Username – (Creamzo id)</label>
                            <input type="text" class="form-control" name="email" id="validationDefault03"  autoComplete="off" value={userData.creamzoId} required disabled />
                        </div>

                        <div class="col-md-6">
                            <label for="validationDefault03" class="form-label">Email address*</label>
                            <input type="text" class="form-control" name="email" id="validationDefault03" value={userData.email} autoComplete="off"  required disabled />
                        </div>
                    </div>

                    <div className="row m-3">
                        <div class="col-md-12">
                            <label for="exampleFormControlTextarea1" className="form-label">About you</label>
                            <textarea className="form-control w-100" name="about" id="exampleFormControlTextarea1" autoComplete="off" value={userData.about} rows="4" onChange={checkAccountInput}></textarea>
                        </div>
                    </div>

                    <div className="row m-3">
                        <div class="col-md-6">
                            <label for="validationDefault03" class="form-label">Location*</label>
                            <input type="text" class="form-control" name="location" id="validationDefault03" autoComplete="off" value={userData.location} required onChange={checkAccountInput} />
                        </div>

                        <div class="col-md-6">
                            <label for="validationDefault04"  class="form-label">Gender*</label>
                            <select class="form-select" name="gender" id="validationDefault04" value={userData.gender} required onChange={checkAccountInput}>
                                <option selected disabled value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-Binary</option>
                            </select>
                        </div>
                    </div>



                </div>

                <div className="col-md-6 ">
                    <div class="col-md-6 userImagestyling">
                    
                        {selectedfile ? <img src={preview} className="previewImage" /> :(userData.profilepic==="" || userData.profilepic===undefined ?  <img src={profilepic} className="previewImage" />:<img src={userData.profilepic} alt="ProfileImage" className="previewImage" />)}
                        <input type="file" onChange={
                             (e)=>{
                                if(e.target.files[0]){
                                    setProfilePicUrl(e.target.files[0]);
                                };
                                onSelectFile(e);
                        } } />


                    </div>
                </div>

                <div className="col-md-6 "></div>
                
            </form>
            <div style={{marginLeft:"47%"}}>
                    <button className="submitBtnEdit" onClick={imagetoCloudinary}>Submit</button>
            </div>

        </>
    )
}

export default Editprofile

