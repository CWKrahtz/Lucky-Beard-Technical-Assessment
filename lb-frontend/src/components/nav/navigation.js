import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './navigation.css'
import Logo from '../../assets/LuckyBeardLogo.png'

function Navigation(props) {

    const navigate = useNavigate();

    const goCreate = () => {
        navigate("/create"); // Navigate to the "Create" page
    };

    return (
        <div className="nav-container">
            <div className="nav-logo">
                <img src={Logo} />
                <h1>LUCKY BEARD</h1>
            </div>
            <div className='nav-btn'>
                <div onClick={goCreate} className='create-btn'>
                    <p>Create new article</p>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
