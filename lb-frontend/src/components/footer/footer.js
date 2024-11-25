import React from 'react';
import Logo from '../../assets/LuckyBeardLogo-white.png'
import Whatsapp from '../../assets/icons/whatsapp.png'
import Facebook from '../../assets/icons/facebook.png'
import Instagram from '../../assets/icons/instagram.png'
import LinkedIn from '../../assets/icons/linkedin.png'
import './footer.css'

function Footer() {

    return (
        <div className='footer-container'>
            <div className='footer-part1'>
                <div className="footer-logo">
                    <img src={Logo} />
                    <h1>LUCKY BEARD</h1>
                </div>
                <div className='footer-policies'>
                    <nav className="policies">
                        <a href="#">Privacy policy</a>
                        <span>|</span>
                        <a href="#">Cookie policy</a>
                    </nav>
                    <div className="social-icons">
                        <a href="#"><img src={Whatsapp} alt="WhatsApp" /></a>
                        <a href="#"><img src={Facebook} alt="Facebook" /></a>
                        <a href="#"><img src={Instagram} alt="Instagram" /></a>
                        <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
                    </div>
                </div>
            </div>
            <div className='footer-part2'>
                <p className="description">
                    By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.
                </p>
                <button className="accept-button">Accept</button>
            </div>
        </div>
    )
}

export default Footer;