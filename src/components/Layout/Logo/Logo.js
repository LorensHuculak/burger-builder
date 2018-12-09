import React from 'react';
import burgerLogo from '../../../assets/Images/burgerlogo.svg';
import './Logo.css';

const logo = (props) => (
    <div className="Logo">
        <img src={burgerLogo} />
    </div>
);

export default logo; 