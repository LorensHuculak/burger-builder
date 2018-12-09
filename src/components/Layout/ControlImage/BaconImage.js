import React from 'react';
import UIImage from '../../../assets/Images/UI_Bacon.png';
import './ControlImage.css';

const baconImage = (props) => (
    <div className={props.inactive ? 'ControlImageDisabled' : 'ControlImage'}>
        <img src={UIImage} />
    </div>
);

export default baconImage; 