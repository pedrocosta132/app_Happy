import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../assets/styles/pages/landing.css';

import logoImg from '../assets/images/logo.svg';

function Landing(){
    return(
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy logo"/>

                <main>
                    <h1>Give happiness to the world</h1>
                    <p>Visit an orphanage and make the day of the children.</p>
                </main>

                <div className="location">
                    <strong>Porto</strong>
                    <span>Portugal</span>
                </div>

                <Link to="/search" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;