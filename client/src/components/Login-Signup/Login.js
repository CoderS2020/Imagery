import React from 'react'
import FooterSticky from '../header-footer/FooterSticky'

function Login() {

    return (
        <div className="container1">
            <h2>You are not logged in</h2>
            <div style={{ marginBottom: "20px" }}>
                <button  type="button" className="nav-link navLink login" style={{border:"none",marginLeft:"15%"}}   data-bs-toggle="modal" id="loginClick" data-bs-target="#exampleModalse" data-bs-whatever="@ft">Login</button>

            </div>
            <FooterSticky/>
        </div>
    )
}

export default Login
