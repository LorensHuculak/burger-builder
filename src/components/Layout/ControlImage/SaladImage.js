import React from 'react';
import UIImage from '../../../assets/Images/UI_Salad.png';
import './ControlImage.css';

const saladImage = (props) => (
    <div className={props.inactive ? 'ControlImageDisabled' : 'ControlImage'}>
        <img src={UIImage} />
    </div>
);

export default saladImage; 