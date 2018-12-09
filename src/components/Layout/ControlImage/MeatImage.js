import React from 'react';
import UIImage from '../../../assets/Images/UI_Meat.png';
import './ControlImage.css';

const meatImage = (props) => (
    <div className={props.inactive ? 'ControlImageDisabled' : 'ControlImage'}>
        <img src={UIImage} />
    </div>
);

export default meatImage; 