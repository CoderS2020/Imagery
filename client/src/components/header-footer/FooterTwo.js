import React from 'react'
import {  FaLinkedin} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../header-footer/FooterTwo.css';

const FooterTwo = () => {
    return (
        <>

        
            <div className="footerTwo">
                <div className="footerdiv">
                    <div ><NavLink className="footertags" to="/aboutpage">About us</NavLink></div>
                    <div ><NavLink className="footertags"  to="/popular">Popular</NavLink></div>
                    <div ><NavLink className="footertags"  to="/explore">Explore</NavLink></div>
                    <div ><NavLink className="footertags"  to="/contact">Contact</NavLink></div>
                    <div ><NavLink className="footertags"  to="/privacy">Terms</NavLink></div>

                </div>


                <div className="socialfooterTwo">                   
                    <a href="https://www.linkedin.com/in/swaraj-pawar-74360b209/" target="_blank">
                        <FaLinkedin className="social-icons" size={25} style={{fill:"white"}}/>
                    </a>
                </div>
            </div>

    </>
    )
}

export default FooterTwo
