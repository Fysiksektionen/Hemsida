import React from 'react';
import FButton from './f-styled/buttons/FButton';
import { Search, Menu } from '@material-ui/icons';
import logo from '../Fysiksektionen_logo.svg';
import './header.css'

function Header() {
  return (
    <div 
      className="navbar sticky-top bg-light px-4" 
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
        
        <a className="navbar-brand mx-5 text-center" href="/">
            <img src={logo} width="80" height="80" alt="" />
            <h2>Fysiksektionen</h2>
        </a>
        <div>
          <FButton
            text="Menu"
            Icon={Menu}
            style={{ float: "right" }}
          />
          <FButton
            text="Search"
            Icon={Search}
            version="dark"
            style={{ float: "right" }}
          />
        </div>
    </div>
  );
}

export default Header;
