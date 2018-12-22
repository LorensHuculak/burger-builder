import React from 'react';
import './Toolbar.css';
import Logo from '../../Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
<header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />

<div className="ToolBarLogo"><a href="/"><Logo /></a></div>
   
  
   
  <nav className="DesktopOnly" >
    <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
</header>
);
 
export default toolbar;