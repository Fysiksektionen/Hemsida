import { Button, Container } from '@material-ui/core';
import './header.css'
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import logo from '../Fysiksektionen_logo.svg';
import { GroupedSearch } from './search-box';
import SidebarMenu from './SidebarMenu';


function Header() {
  return (
    <>
      <div className="navbar sticky-top bg-light">
        <a className="navbar-brand mx-5 text-center" href="/">
            <img src={logo} width="80" height="80" alt="" />
            <h2>Fysiksektionen</h2>
        </a>
        <div className="mx-4">
          <GroupedSearch/>
        </div>
        <SidebarMenu/>
      </div>
    </>
  );
}

export default Header;
