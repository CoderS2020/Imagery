import React, { useEffect, useState,useContext } from 'react';
import "../Board/BoardCss/normalize.css"
import "../Board/BoardCss/modal_styles.css"
import "../Board/BoardCss/pin_styles.css";
import "../Board/BoardCss/final_board.css";
import "./MyUploads.css";

import { MdDelete } from "react-icons/md";

import { UserContext,InputContext } from "../../App";


import { Link, useHistory } from "react-router-dom";




function Login_Home() {
    const history = useHistory();

   
    const [images, setimages] = useState([]);
    const [userId, setuserId] = useState("");
    const [userCollection, setuserCollection] = useState([]);
    const { state, dispatch } = useContext(UserContext);


    const [userInfo, setUserInfo] = useState({ idUploader:"",author: "", title: "", description: "", destination: "", tags: "", pin_sizes: "", url: "", email: "" })
    const [pictures, setPictures] = useState([]);
    const {state1,dispatch1} = useContext(InputContext);


    const getUserInformation = async () => {
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

            setUserInfo({ ...userInfo, author: data.fullName, email: data.email,idUploader:data._id });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login"); //login page to be created
        }
        dispatch({ type: "USER", payload: true });


    };


    const renderingPictures = pictures.filter((val)=>{
        
        if(state1==""){
            return val;
        }
        else if(val.title.toLowerCase().includes(state1.toLowerCase()) || val.tags.toLowerCase().includes(state1.toLowerCase())){
            return val;
        }
    }).map((image, index) => {
        return (

            <>
                {image.email === userInfo.email ?

                    <>

                        <div className={(
                            image.pin_sizes==="" || image.pin_sizes===undefined?(index % 2 == 0 ? "img1 card card_large " : ((index % 3 == 0) ? "img1 card card_medium " : "img1 card card_small "))
                            : `img1 card card_${image.pin_sizes}`                       
                        
                        )}>

                                <div className="ImageInformationHeader sameClass">
                                    
                                    <div className="addCollection">
                                        <MdDelete size={32}  style={{ fill: "red" }} onClick={(e) => deleteImage(image._id)} />
                                    </div>

                                </div>

                            <Link to={`/imageinformation/${image._id}`}  className="singleImages1" >
                      
                                <img src={image.url} className="singleImage4" index={index} alt="image" />
                            </Link>

                            


                        </div>
                    </> : <></>}
            </>
        )

    })

    const handleImageDataposting = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserInfo({ ...userInfo, [name]: value });

    };

    const sendImageData = async (e) => {
        var d=new Date();
        var timeofUpload=String(d.getDate())+String(d.getMonth())+String(d.getFullYear());


        e.preventDefault();
        const { author, title, description, destination, tags, pin_sizes, url, email,idUploader } = userInfo;
        console.log(userInfo);
        if(url===undefined || url===""){
            alert('Please upload an image...');
            return;
        }
        const res = await fetch('/saveimage', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author, title, description, destination, tags, pin_sizes, url, email,timeofUpload,idUploader
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {
            alert(`Image uploaded successfully`);
            setUserInfo({ ...userInfo, description: "", tags: "", destination: "", title: "", pin_sizes: "", url: "" });
            getAllImages();
        }
    }



    const getAllImages = async (e) => {

        const res = await fetch('/getallimages', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {
  
            setPictures(data);


        }
    };

   

    const deleteImage = async (imageid) => {

        
        const res = await fetch('/deletepost', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageid
            })
        });

        const data = await res.json();
        if (!data) {
            console.log("Request failed!!");
        }
        else {


            getAllImages();
        }


    };



    useEffect(() => {

        getAllImages();

    }, []);


    useEffect(() => {
        getUserInformation();


    }, [userInfo.author, userInfo.email, userInfo.url]);




    useEffect(() => {
        const add_pin_modal = document.querySelector('.add_pin_modal');

        document.querySelector('.add_pin').addEventListener('click', () => {
            add_pin_modal.style.opacity = 1;
            add_pin_modal.style.pointerEvents = 'all';
        });

        document.querySelector('.add_pin_modal').addEventListener('click', event => {
            if (event.target === add_pin_modal) {
                reset_modal();
            }
        });

        let pin_image_blob = null;

        document.querySelector('#upload_img').addEventListener('change', event => {
            if (event.target.files && event.target.files[0]) {
                if (/image\/*/.test(event.target.files[0].type)) {
                    const reader = new FileReader();

                    reader.onload = function () {
                        const new_image = new Image();

                        new_image.src = reader.result;
                        pin_image_blob = reader.result;


                        // Storing images to cloudinary
                        const data = new FormData();
                        data.append("file", new_image.src);
                        data.append("upload_preset", "imagery");
                        data.append("cloud_name", "dry4vwhik");
                        fetch("https://api.cloudinary.com/v1_1/dry4vwhik/image/upload", {
                            method: "POST",
                            body: data

                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data.url);
                                setUserInfo({ ...userInfo, url: data.url });
                            })
                            .catch(err => {
                                console.log(err);
                            })

                            new_image.onload = function () {
                            const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

                            new_image.classList.add('pin_max_width');

                            document.querySelector('.add_pin_modal .pin_image').appendChild(new_image);
                            document.querySelector('#upload_img_label').style.display = 'none';

                            modals_pin.style.display = 'block';

                            if (
                                new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                                new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                            ) {
                                new_image.classList.remove('pin_max_width');
                                new_image.classList.add('pin_max_height');
                            }

                            modals_pin.style.opacity = 1;
                        }
                    }

                    reader.readAsDataURL(event.target.files[0]);
                }
            }

            document.querySelector('#upload_img').value = '';
        });

        document.querySelector('.save_pin').addEventListener('click', () => {
            const users_data = {
                author: 'Swaraj', //dynamically allocate value
                // board: 'default',
                title: document.querySelector('#pin_title').value,
                description: document.querySelector('#pin_description').value,
                destination: document.querySelector('#pin_destination').value,
                tags: document.querySelector('#pin_tags').value,
                img_blob: pin_image_blob,
                pin_size: document.querySelector('#pin_size').value
            }

            // create_pin(users_data); //to create pins of recently saved images
            // console.log(users_data);
            reset_modal();
        }
        );


        function create_pin(pin_details) {
            const new_pin = document.createElement('DIV');
            const new_image = new Image();

            new_image.src = pin_details.img_blob;
            new_pin.style.opacity = 0;

            new_image.onload = function () {
                new_pin.classList.add('card');
                new_pin.classList.add(`card_${pin_details.pin_size}`);
                new_image.classList.add('pin_max_width');

                new_pin.innerHTML = `<div class="pin_title">${pin_details.title}</div>
                <div class="pin_modal">
                    
                </div>
                
                <div class="pin_image">
                </div>`;

                document.querySelector('.pin_container').appendChild(new_pin);
                new_pin.children[2].appendChild(new_image);

                if (
                    new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                    new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                ) {
                    new_image.classList.remove('pin_max_width');
                    new_image.classList.add('pin_max_height');
                }

                new_pin.style.opacity = 1;
            }
        }


        function reset_modal() {
            const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

            add_pin_modal.style.opacity = 0;
            add_pin_modal.style.pointerEvents = 'none';
            document.querySelector('#upload_img_label').style.display = 'block';
            modals_pin.style.display = 'none';
            modals_pin.style.opacity = 0;

            if (modals_pin.children[0].children[0]) modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
            document.querySelector('#pin_title').value = '';
            document.querySelector('#pin_description').value = '';
            document.querySelector('#pin_destination').value = '';
            document.querySelector('#pin_tags').value = '';
            // document.querySelector('#pin_size').value = '';
            pin_image_blob = null;
        }
    }, []);




    return (
        <>
            <form>
                <div class="navigation_bar">
                    <div class="pint_mock_icon_container add_pin">
                        <img src={require(`../Board/BoardImages/add.png`).default} alt="add_pin" class="pint_mock_icon" />
                    </div>
                </div>

                <div class="pin_containers1">

                    {/* Already uploaded images will come here */}
                    {renderingPictures}


                </div>

                <div class="add_pin_modal">
                    <div class="add_pin_container">

                        <div class="side" id="left_side">
                            <div class="section1">
                                <div class="pint_mock_icon_container">
                                    {/* <img src={require(`../Board/BoardImages/ellipse.png`).default} alt="edit" class="pint_mock_icon"/> */}
                                </div>
                            </div>

                            <div class="section2">
                                <label for="upload_img" id="upload_img_label">
                                    <div class="upload_img_container">
                                        <div id="dotted_border">
                                            <div class="pint_mock_icon_container">
                                                <img src={require(`../Board/BoardImages/up-arrow.png`).default} alt="upload_img" class="pint_mock_icon" />
                                            </div>
                                            <div>Click to upload</div>
                                            <div>Recommendation: Upload images less than 4MB</div>
                                        </div>
                                    </div>
                                    <input className="upload_img" type="file" id="upload_img" onChange={e => console.log(e.target.files)} />

                                </label>

                                <div class="modals_pin">
                                    <div class="pin_image">
                                        {/* <img src="" alt="pin_image" /> */}
                                    </div>
                                </div>
                            </div>

            
                        </div>

                        <div class="side" id="right_side">
                            <div class="section1">
                                <div class="select_size">
                                    <select id="pin_size" name="pin_sizes" onChange={handleImageDataposting}>
                                        <option name="pin_sizes" value="" disabled selected>Select</option>
                                        <option name="pin_sizes" value="small" >small</option>
                                        <option name="pin_sizes" value="medium" >medium</option>
                                        <option name="pin_sizes" value="large" >large</option>
                                    </select>
                                    <div class="save_pin" onClick={sendImageData} >
                                        Save
                                    </div>
                                </div>
                            </div>

                            <div class="section2">
                                <input placeholder="Post title " type="text" class="new_pin_input" id="pin_title" name="title" value={userInfo.title} onChange={handleImageDataposting}  autoComplete="off"/>
                                <input placeholder="Description" type="text" class="new_pin_input" id="pin_description" name="description" value={userInfo.description} onChange={handleImageDataposting} autoComplete="off" />
                                <input placeholder="Tags" type="text" class="new_pin_input" id="pin_tags" name="tags" value={userInfo.tags} onChange={handleImageDataposting}  autoComplete="off"/>
                                <input placeholder="Destination link" type="text" class="new_pin_input" id="pin_destination" name="destination" value={userInfo.destination} onChange={handleImageDataposting}  autoComplete="off"/>
                            </div>
                        </div>


                    </div>
                </div>
            </form>

    


        </>
    )
};



export default Login_Home
