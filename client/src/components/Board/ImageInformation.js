import React, { useState, useEffect ,useContext} from 'react';
import "./ImageInformation.css"
import { FaShareAlt, FaHeart,FaLinkedin } from "react-icons/fa";
import { HiDownload, HiEye } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const ImageInformation = ({ match }) => {
    var _id = match.params.id;
    const history = useHistory();

    const [userId, setuserId] = useState("");
    const [userFollowing, setuserFollowing] = useState([]);
    
    const [imageInfo, setImageInfo] = useState({});
    const [likes,setLikes]=useState(0);
    const [download,setDownload]=useState(0);
    const [share,setShare]=useState(0);
    const [views,setViews]=useState(0);

    const { state, dispatch } = useContext(UserContext);


    const callUserData = async () => {
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
      
            setuserId(data._id);
            setuserFollowing(data.following);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
 
            history.push("/login"); //login page to be created
            return;
        }
        dispatch({ type: "USER", payload: true });

    }

    useEffect(() => {
        callUserData();
        

    }, [userId]);



    const getImageData = async () => {


        const res = await fetch('/getimagedata', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {
         
            setImageInfo(data[0]);
            setLikes(data[0].likes.length);
            setDownload(data[0].download.length);
            setShare(data[0].share.length);
            setViews(data[0].view.length);
 


        }
    };


    useEffect(() => {
        getImageData();
     
    }, [userFollowing]);

    useEffect(()=>{
        viewsCount(_id);
    },[])

    const viewsCount = async (imageid) => {

     
        const res = await fetch('/viewCount', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid, userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {



            setImageInfo(data);

            

        }


    };


    const followUser=()=>{
        let authorId=imageInfo.idUploader;
        let selfId=userId;
        fetch('/follow',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId,selfId
            })
        }).then(res=>res.json())
        .then(data=>{
     
            callUserData();
        })
    }

    const unfollowUser=()=>{
        var authorId=imageInfo.idUploader;
        var selfId=userId;
        fetch('/unfollow',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId,selfId
            })
        }).then(res=>res.json())
        .then(data=>{

            callUserData();
        })

    }

    var boolCheck=false;
    for(var i=0;i<userFollowing.length;i++){
        if(userFollowing[i].Aid.includes(imageInfo.idUploader)){
            boolCheck=true;
            break;
            
        }
        

    }




    return (
        <>
            <div className="container mt-5">
                <div className="row">
                <div>
                    {imageInfo.idUploader===userId?<></>:
                            boolCheck?<button className="buttonunFollow" onClick={unfollowUser}>Following</button>:<button className="buttonFollow" onClick={followUser}>Follow</button>}
                    </div>
                    <div className="col-md-6 expandedImage">
                        <div class="col-md-12 ">
                            <img src={imageInfo.url} className="imageShaping" alt="Currently not visible" />

                        </div>
                    </div>
                    
                    <div className="col-md-6 mt-3">
                        <div class="col-md-12 firstRow">
                            <h4>Title:{imageInfo.title}</h4>
                            
                            </div>

                        <div class="col-md-12 firstRow">
                            <h4>URL: </h4><a href={"https://" + imageInfo.destination} target="_blank" rel="noreferrer" className="urlImageSizing">{imageInfo.destination}</a>
                        </div>

                        <div class="col-md-12 firstRow">
                            <h4>Description: {imageInfo.description}</h4>
                        </div>

                        <div class="col-md-12 firstRow">
                            <h4>Author: {imageInfo.author} </h4>
                            

                        </div>
                        <div class="col-md-12 firstRow">
                            <HiDownload size={24} />&nbsp;<p>: {download}</p>
                        </div>
                        <div class="col-md-12 firstRow">
                            <HiEye size={24} />&nbsp;<p>: {views}</p>
                        </div>
                        <div class="col-md-12 firstRow">
                            <FaShareAlt size={24} />&nbsp;<p>: {share}</p>
                        </div>
                        <div class="col-md-12 firstRow">
                            <FaHeart size={24} style={{ fill: "red" }} />&nbsp; <p>: {likes}</p>
                        </div>
                        <div>

                               <h4>Find Us on:</h4> 
                            <div className="socialMedia">
                                
                                <a href="https://www.linkedin.com/in/swaraj-pawar-74360b209/" target="_blank" rel="noreferrer">
                                    <FaLinkedin className="iconsSocialMedia"  size={25} style={{ fill: "#0077b5" }} />
                                </a>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>


         


        </>
    )
}

export default ImageInformation
