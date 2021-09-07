import React, { useEffect, useState,useContext } from 'react'
import { useHistory } from 'react-router-dom';
import "./Profilepage.css";
import {  FaHeart } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { Link } from "react-router-dom";
import defaultImage from "./defaultprofile1.png";
import { UserContext } from "../../App";
import FooterSticky from '../header-footer/FooterSticky';


const Profilepage = ({ match }) => {
    const history = useHistory();
    const [user, setUser] = useState({ fullName: "", email: "", profileImage: "", creamzoId: "", followers: [], following: [],selfId:"" });
    const { state, dispatch } = useContext(UserContext);


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
            setUser({ ...user,selfId:data._id, fullName: data.fullName, email: data.email, profileImage: data.profilepic, creamzoId: data.creamzoId, followers: data.followers, following: data.following });


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login");
        }
        dispatch({ type: "USER", payload: true });

    }

    useEffect(() => {
        fetchUserData();

    }, [user.fullName]);






    const ModalFollowerClose = (e) => {
        document.getElementById('exampleModales').click();

    };

    const ModalFollowingClose = (e) => {
        document.getElementById('exampleModales1').click();

    };

    const renderFollowing1 = user.following.map((user1, index) => {
        return (

            <li style={{ listStyle: "none" }} key={index}>
                {user1.Apic==="" || user1.Apic===undefined || user1.Apic===null?<img style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} src={defaultImage}/>:<img src={user1.Apic} style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} />}
                
                <Link to={`/userprofile/${user1.Aid}`} style={{textDecoration:"none",color:"black"}} onClick={ModalFollowingClose}>
                    {user1.Aname}
                </Link>
                
            </li>
        )
    })

    const renderFollowers1 = user.followers.map((user2,index)=>{
        return(
            
                <li style={{ listStyle: "none" }}>
                    {user2.Spic==="" || user2.Spic===undefined?<img style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} src={defaultImage}/>:<img src={user2.Spic} style={{ borderRadius: "50%", height: "50px", width: "50px", margin: "10px" }} />}
                    
                    <Link to={`/userprofile/${user2.Sid}`} style={{textDecoration:"none",color:"black"}} onClick={ModalFollowerClose}>
                        {user2.Sname}
                    </Link>
                </li>
            
        )
    })



    return (
        <div className="container1">

            <div >
                {(user.profileImage === "" || user.profileImage === undefined) ? <img className="profileSetting" src={defaultImage} /> : <img className="profileSetting" src={user.profileImage} />}

            </div>
            <div style={{ marginBottom: "15px" }}>
                <h1 >{user.fullName}</h1>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h4 >Creamzo Id: {user.creamzoId}</h4>
            </div>

            <div style={{ marginBottom: "20px", display: "flex" }}>
                <div className="giveSpacing followButtons" data-bs-toggle="modal" data-bs-target="#exampleModales"> {user.followers.length} Followers</div>

                <div className="giveSpacing followButtons" data-bs-toggle="modal" data-bs-target="#exampleModales1"> {user.following.length} Following</div>

            </div>

            <div >
                <Link to="/likes" className="giveSpacing" ><FaHeart size={28} style={{ fill: "red" }} /> Likes</Link>
                <Link to="/collection" className="giveSpacing" ><FiPlusCircle size={28} /> Collection</Link>
                <Link to="/myuploads" className="giveSpacing" ><BsImages size={28} /> My uploads </Link>
            </div>

 



            {/* Follower */}
            <div className="modal fade" id="exampleModales" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel" style={{ margin: "auto" }}>{user.followers.length} Followers</h3>
                            <button style={{ marginLeft: "-20px" }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {renderFollowers1}


                        </div>

                    </div>
                </div>
            </div>


            {/* Following */}
            <div className="modal fade" id="exampleModales1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel" style={{ margin: "auto" }}>{user.following.length} Following</h3>
                            <button style={{ marginLeft: "-20px" }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {renderFollowing1}


                        </div>

                    </div>
                </div>
            </div>

            <FooterSticky/>

        </div>
    )
}

export default Profilepage
