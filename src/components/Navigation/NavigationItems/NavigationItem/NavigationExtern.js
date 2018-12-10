import React from 'react';
import './NavigationItem.css';



const navigationExtern = (props) => (
    <ul>
        <li className="NavigationItem">
        
            <a href={props.link}> {props.children}</a>            </li>
    </ul>
);

export default navigationExtern;