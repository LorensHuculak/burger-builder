import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="https://reactjs.org/"><i class="fab fa-react"></i> React.js</NavigationItem>
        <NavigationItem link="https://solidity.readthedocs.io/en/v0.4.25/"><i class="fab fa-ethereum"></i> Solidity</NavigationItem>
        <NavigationItem link="https://github.com/LorensHuculak/burgerbuilder" > <i class="fab fa-github"> </i> GitHub</NavigationItem>
    </ul>
);

export default navigationItems;