import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom';


const navigationItems = (props) => (
    <ul>
        <li className="NavigationItem">
        
            <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={'active'}> {props.children}</NavLink>            </li>
    </ul>
);

export default navigationItems;