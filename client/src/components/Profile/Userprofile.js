import React, { useEffect, useState,useContext } from 'react';
import { useParams } from "react-router-dom";
import defaultImage from "./defaultprofile1.png";

import { UserContext } from "../../App";

import "./UserProfile.css";

const Userprofile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({ fullName: "", email: "", profileImage: "", creamzoId: "", userid: "",followers: [], following: [] });
    const [selfId, setselfId] = useState("");
    const [userFollowing, setuserFollowing] = useState([]);
    const { state, dispatch } = useContext(UserContext);


    const selfData = async () => {
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
        
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            setselfId(data._id);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        selfData();
        getUserData();



    }, [userFollowing]);

    const getUserData = async () => {


        const res = await fetch('/userprofile', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
            return;
        }
        else {
                     
            setUser({ ...user, fullName: data.fullName, email: data.email, profileImage: data.profilepic, creamzoId: data.creamzoId, userid: data._id,followers: data.followers, following: data.following });
            setuserFollowing(data.followers);


        }
              dispatch({ type: "USER", payload: true });
        

    };


    useEffect(() => {
        getUserData();
    }, []);

    const followUser = () => {
        let authorId = userId;
      

        fetch('/follow', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId, selfId
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data);
            })
        getUserData();
     

        // console.log(userFollowing.includes(user.userId));
    }

    const unfollowUser = () => {
        let authorId = user.userid;
        fetch('/unfollow', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId, selfId
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data);
            })
        getUserData();
        

    };

    const ModalFollowerClose = (e) => {
        document.getElementById('exampleModalesss').click();

    };

    const ModalFollowingClose = (e) => {
        document.getElementById('exampleModalesss1').click();

    };

    const renderFollowing2 = user.following.map((user1, index) => {
        return (

            <li style={{ listStyle: "none" }}>
                {user1.Apic==="" || user1.Apic===undefined || user1.Apic===null?<img alt=".." style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} src={defaultImage}/>:<img alt="Image" src={user1.Apic} style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} />}
                
                <a href={`/userprofile/${user1.Aid}`} style={{textDecoration:"none",color:"black"}} onClick={ModalFollowingClose}>
                    {user1.Aname}
                </a>
                
            </li>
        )
    });

    const renderFollowers2 = user.followers.map((user2,index)=>{
        return(
            
                <li style={{ listStyle: "none" }}>
                    {user2.Spic==="" || user2.Spic===undefined || user2.Spic===null?<img alt="Image" style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} src={defaultImage}/>:<img alt="Image" src={user2.Spic} style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} />}
                    
                    <a href={`/userprofile/${user2.Sid}`} style={{textDecoration:"none",color:"black"}} onClick={ModalFollowerClose}>
                        {user2.Sname}
                    </a>
                </li>
            
        )
    });



    var boolCheck = false;
    for (var i = 0; i < userFollowing.length; i++) {
        if (userFollowing[i].Sid.includes(selfId)) {
            boolCheck = true;
            break;
        }


    }
    return (
        <div className="container1">

            <div >
                {(user.profileImage === "" || user.profileImage === undefined || user.profileImage===null) ? <img src={defaultImage} alt="User" className="profileSetting" /> : <img src={user.profileImage} alt="Image" className="profileSetting" />}

            </div>
            <div >
                <h1 >{user.fullName}</h1>
            </div>
            <div >
                <h4 >Imagery Id: {user.creamzoId}</h4>
            </div>
            <div>

            {selfId===user.userid?<></>:boolCheck ? <button className="buttonunFollow1" onClick={unfollowUser}>Following</button> : <button className="buttonunFollow1" onClick={followUser}>Follow</button>}

            </div>
            <div style={{ marginBottom: "20px", display: "flex" }}>
                <div className="giveSpacing followButtons" data-bs-toggle="modal" data-bs-target="#exampleModalesss"> {user.followers.length} Followers</div>

                <div className="giveSpacing followButtons" data-bs-toggle="modal" data-bs-target="#exampleModalesss1"> {user.following.length} Following</div>

            </div>

                        {/* Follower */}
                        <div class="modal fade" id="exampleModalesss" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel" style={{ margin: "auto" }}>{user.followers.length} Followers</h3>
                            <button style={{ marginLeft: "-20px" }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {renderFollowers2}


                        </div>

                    </div>
                </div>
            </div>


            {/* Following */}
            <div class="modal fade" id="exampleModalesss1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel" style={{ margin: "auto" }}>{user.following.length} Following</h3>
                            <button style={{ marginLeft: "-20px" }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {renderFollowing2}


                        </div>

                    </div>
                </div>
            </div>
                        
        </div>
    )
}

export default Userprofile
