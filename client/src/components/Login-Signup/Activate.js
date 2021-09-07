import React,{useEffect} from 'react';

import {  useHistory } from 'react-router-dom';




const Activate = ({match}) => {
    var token1 = match.params.link;
    const history = useHistory();
  
   

    useEffect(()=>{
        activateLink();
    },[]);

    const activateLink=async(e)=>{
        

        const res=await fetch('/emailVerification',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token1
            })
        });

        const data=await res.json();

        if(data===true){
            alert("Email Verified,please log in");

            history.push('/login');
        }
        else{
            alert(data.error);
            
        }
    }

    return (
        <div>
            {/* Activation Failed... */}
        </div>
    )
}

export default Activate
