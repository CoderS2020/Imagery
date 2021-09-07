import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';



const PasswordReset = ({ match }) => {
    var token1 = match.params.link;
    const history = useHistory();
    const {newPassword,setNewpassword}=useState("");
    const [userData, setUserData] = useState({newPassword:""});

    const changepassword=(e)=>{
      
        const name=e.target.name;
        const value=e.target.value;
    
        setUserData({...userData,[name]:value});
    
    }
    console.log(newPassword)

    const activateresetLink = async (e) => {

        
        const res = await fetch('/resetPassword', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resetLink: token1, newPassword:userData.newPassword
            })
        });

        const data = await res.json();
        console.log(data);
        if (data ) {
            alert("Password changed successfully,please log in");

            history.push('/login');
        }
        else {
            alert(data.error);

        }
    }

    return (
        <div className="container1">
            
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Enter new password here*</label>
                <input type="password" name="newPassword" className="form-control w-100" id="exampleFormControlInput1"  value={userData.newPassword} onChange={changepassword} autoComplete="off"  />
                <button className="btn btn-primary submitBtn" style={{marginLeft:"79%"}} onClick={activateresetLink} >Reset</button>
            </div>
        </div>
    )
}

export default PasswordReset
