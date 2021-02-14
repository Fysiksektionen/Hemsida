import React from 'react';
import './footer.css'
import Toe from './Toe';

function Footer() {
    
    return (
        <>
        <div className="container-fluid py-4 bg-dark text-white text-center">

            <h3>Hitta hit</h3>

            Brinellvägen 89, 114 28 Stockholm

        </div>
        <Toe
            webmaster="Christoffer Ejemyr"
            currYear={2021}
        />
        </>
    )
}

export default Footer;
