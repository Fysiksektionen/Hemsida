import React from 'react';
import logo from '../Fysiksektionen_logo.svg';
import './header.css'

function Header() {
  return (
    <div className="navbar sticky-top bg-light">

        <a className="navbar-brand mx-5 text-center" href="#">
            <img src={logo} width="80" height="80" alt="" />
            <h2>Fysiksektionen</h2>
        </a>

    </div>
  );
}

export default Header;
