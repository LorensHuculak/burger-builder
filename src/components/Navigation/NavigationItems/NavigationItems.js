import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationExtern from './NavigationItem/NavigationExtern';


const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationExtern link="https://reactjs.org/"><i class="fab fa-react"></i> React.js</NavigationExtern>
        <NavigationExtern link="https://solidity.readthedocs.io/en/v0.4.25/"><i class="fab fa-ethereum"></i> Solidity</NavigationExtern>
        <NavigationExtern link="https://github.com/LorensHuculak/burgerbuilder" > <i class="fab fa-github"> </i> GitHub</NavigationExtern>

        {props.isAuthenticated ?  <NavigationItem link="/logout" >Logout</NavigationItem>
        : <NavigationItem link="/auth" >Login</NavigationItem>}
    </ul>
);

export default navigationItems; 