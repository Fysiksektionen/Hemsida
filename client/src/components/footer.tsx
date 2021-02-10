import React from 'react';
import GoogleMap from './googleMap'
import './footer.css'

function Footer() {
    
    return (
        <div className="container-fluid py-4 bg-dark text-white text-center">

            <h3>Hitta hit</h3>

            Brinellvägen 89, 114 28 Stockholm

            <GoogleMap />

        </div>
    )
}

export default Footer;
