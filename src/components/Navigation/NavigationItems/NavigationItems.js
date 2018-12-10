import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationExtern from './NavigationItem/NavigationExtern';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationExtern link="https://reactjs.org/"><i class="fab fa-react"></i> React.js</NavigationExtern>
        <NavigationExtern link="https://solidity.readthedocs.io/en/v0.4.25/"><i class="fab fa-ethereum"></i> Solidity</NavigationExtern>
        <NavigationExtern link="https://github.com/LorensHuculak/burgerbuilder" > <i class="fab fa-github"> </i> GitHub</NavigationExtern>
        <NavigationItem link="/orders" > My Orders</NavigationItem>
    </ul>
);

export default navigationItems;