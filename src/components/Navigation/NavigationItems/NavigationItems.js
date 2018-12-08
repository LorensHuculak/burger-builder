import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/">React.js</NavigationItem>
        <NavigationItem link="/">Solidity</NavigationItem>
        <NavigationItem link="https://github.com/LorensHuculak/burgerbuilder" > <i class="fab fa-github"> </i> GitHub</NavigationItem>
    </ul>
);

export default navigationItems;