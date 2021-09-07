import React from 'react';
import './Footer.css';
import {  FaLinkedin} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function FooterSticky() {
    return (
        <>

        
            <div className="footerSticky">
                <div className="footerdiv">
                    <div ><NavLink className="footertags" to="/aboutpage">About us</NavLink></div>
                    <div ><NavLink className="footertags"  to="/popular">Popular</NavLink></div>
                    <div ><NavLink className="footertags"  to="/explore">Explore</NavLink></div>
                    <div ><NavLink className="footertags"  to="/contact">Contact</NavLink></div>
                    <div ><NavLink className="footertags"  to="/privacy">Terms</NavLink></div>

                </div>


                <div className="social">                   
                    <a href="https://www.linkedin.com/in/swaraj-pawar-74360b209/" target="_blank">
                        <FaLinkedin className="social-icons" size={25} style={{fill:"white"}}/>
                    </a>
                </div>
            </div>

        </>
    )
}

export default FooterSticky
