import React,{useState,useEffect} from 'react'
import "../Board/IndividualUploader.css";
import upperRightArrow from "../Board/BoardImages/upper-right-arrow.png";
import { FaShareAlt,FaHeart } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { FiLink ,FiPlusCircle} from "react-icons/fi";

import { PinterestButton} from "react-social";

import {
    FacebookIcon,
    FacebookShareButton,    
    LinkedinShareButton,       
    TwitterShareButton,   
    TwitterIcon,
    WhatsappShareButton,
    LinkedinIcon,
    PinterestIcon,
    WhatsappIcon,
  } from "react-share";

import axios from 'axios';
import {Link,useHistory} from "react-router-dom";



const Collection = () => {
    const history=useHistory();
    const [images, setimages] = useState([]);
    const [userId,setuserId]=useState("");
    const [userCollection,setuserCollection]=useState([]);

    const callUserData=async()=>{
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
            
            setuserId(data._id);
            setuserCollection(data.addedImages);
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }

        } catch (error) {
           
            history.push("/login"); 
        }
    }

    const getAllImages=async(e)=>{
     
        const res=await fetch('/getallimages',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data=await res.json();
        if(!data){
            console.log("Request failed!!");
        }
        else{
            // console.log(data);
            setimages(data);
            // console.log(images);

        }
    };

  const downloadImage=(imageUrl,imageTitle)=>{
    axios({
        url:imageUrl,
        method:"GET",
        responseType:'blob',
    })
    .then((response)=>{
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute('download',imageTitle+".jpg");

        document.body.appendChild(link);
        link.click();
    })
  }  

    useEffect(() => {
        
        getAllImages();
      
    }, []);

    useEffect(() => {
        callUserData();
        // console.log(userId);
        // console.log(userCollection);
       
    }, [userId]);
    

    
    const LikeImage=async(imageid)=>{
        
        // console.log(imageid,userId);
        const res = await fetch('/Like', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid,userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {

            // console.log(data);
            
            const newImageData=images.map(image=>{
                if(image._id==data._id){
                    return data;
                }
                else{
                    return image;
                }
            });
            setimages(newImageData);


        }


    };

    const UnLikeImage=async(imageid)=>{
        
        // console.log(imageid,userId);
        const res = await fetch('/unLike', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid,userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {

            // console.log(data);
            
            const newImageData=images.map(image=>{
                if(image._id==data._id){
                    return data;
                }
                else{
                    return image;
                }
            });
            setimages(newImageData);


        }


    };

    const AddImageCollection=async(imageid)=>{
        
        // console.log(imageid,userId);
        const res = await fetch('/addImageCollection', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid,userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {

            setuserCollection(data.addedImages);
            
            


        }


    };

    const RemoveImageCollection=async(imageid)=>{
        

        const res = await fetch('/removeImageCollection', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid,userId
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {

            setuserCollection(data.addedImages);

        }


    };
    
    

    const renderingImages=images.map((image,index)=>{
        return (
            <>
                {userCollection.includes(image._id)?<>
                <div className={(
                            image.pin_sizes==="" || image.pin_sizes===undefined?(index % 2 === 0 ? "img1 card card_large " : ((index % 3 === 0) ? "img1 card card_medium " : "img1 card card_small "))
                            : `img1 card card_${image.pin_sizes}`                       
                        
                        ) }>

                    <div className="ImageInformationHeader sameClass">
                        <div className="likeLink "  >
                            {image.likes.includes(userId)?<FaHeart size={24} style={{fill:"red"}} onClick={(e)=>UnLikeImage(image._id)}  />:<FaHeart size={24} style={{fill:"white"}} onClick={(e)=>LikeImage(image._id)}  />}
                        </div>

                        <div className="addCollection">
                        {userCollection.includes(image._id)?<FiPlusCircle size={32} onClick={(e)=>RemoveImageCollection(image._id)} style={{fill:"pink"}}/>:<FiPlusCircle size={32} onClick={(e)=>AddImageCollection(image._id)} style={{fill:"white"}}/>}
                        </div>

                    </div>

                    <Link to={`/imageinformation/${image._id}`}  className="singleImages1" > 
                        <img src={image.url} className="singleImage"  index={index}   alt="image"/>
                    </Link>

                    <div className="ImageInformationFooter sameClass">
                    <div className="pinUrl">
                        
                        <div className="linkArrow">
                            
                                <img src={upperRightArrow}  alt="arrow" className="arrowSize"/>
                           
                            <div className="linkUrl">
                                <a href={"https://"+image.destination} style={{textDecoration:"none"}} target="_blank">{image.destination}</a>
                            </div>
                        </div>

                    
                    </div>

                    <div className="shareLink " >

                          
                            
                            <div class="dropdown shareDropdown">
                                <a class="dropdown-toggle"  id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="true">
                                <FaShareAlt></FaShareAlt>
                                </a>
                            
                                <ul class="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    
                                    <li >
                                            <FacebookShareButton style={{marginLeft:"5%"}} url="https://www.google.com" quote={"hello"} hashtag="#react">
                                                <FacebookIcon className="shareLinkTags"  logoFillColor="black" round={true}></FacebookIcon>
                                            </FacebookShareButton>
                                            <TwitterShareButton url="https://www.google.com" quote={"hello"} hashtag="#react">
                                                <TwitterIcon className="shareLinkTags" logoFillColor="black" round={true}></TwitterIcon>
                                            </TwitterShareButton>
                                            <LinkedinShareButton url="https://www.google.com" quote={"hello"} hashtag="#react">
                                                <LinkedinIcon className="shareLinkTags" logoFillColor="black" round={true}></LinkedinIcon>
                                            </LinkedinShareButton>
                                    
                                        
                                    </li>
                                    
                                    <li>
                                            
                                            <PinterestButton url="https://www.google.com" style={{backgroundColor: "transparent",border: "transparent",marginLeft:"5%"}} appId={1469167}>
                                                <PinterestIcon className="shareLinkTags" logoFillColor="black" round={true}>
                                                        
                                                </PinterestIcon>
                                            </PinterestButton> 


                                            <WhatsappShareButton url="https://www.google.com" quote={"hello"} hashtag="#react">
                                                <WhatsappIcon className="shareLinkTags" logoFillColor="black" round={true}></WhatsappIcon>
                                            </WhatsappShareButton>
                                            <FiLink  className="copyLinktag" onClick={() => {navigator.clipboard.writeText("Copying to clipboard")}}></FiLink>
                                            {/* <button >Copy to clipboard</button> */}
                                        
                                    </li>

                                </ul>
                            </div>
                    </div>


                    <div className="downloadLink" onClick={()=>downloadImage(image.url,image.title)} >                        
                        <HiDownload />
                   </div>
                </div>
                </div>

                </>:<></>}
            </>
        )
    })
   



    return (
        <>
        <div>
            <div className="pin_containers1" >
                
                    {renderingImages}
                
            </div>

        </div>



        </>
    )
}

export default Collection
