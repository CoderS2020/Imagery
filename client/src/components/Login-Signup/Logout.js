import React,{useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from "../../App";

function Logout() {
    const history=useHistory();
    const {state,dispatch} = useContext(UserContext);


    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false});
            history.push('/');
            if(res.status!==200){
                const error=new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

    return (
        <>
            Your are logged out!   
        </>
    )
}

export default Logout
