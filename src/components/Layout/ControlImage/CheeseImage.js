import React from 'react';
import UIImage from '../../../assets/Images/UI_Cheese.png';
import './ControlImage.css';

const cheeseImage = (props) => (
    <div className={props.inactive ? 'ControlImageDisabled' : 'ControlImage'}>
        <img src={UIImage} />
    </div>
);

export default cheeseImage; 