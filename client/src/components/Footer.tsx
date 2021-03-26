import React, { useContext } from 'react';
import GoogleMap from './GoogleMap';
import './Footer.css';
import Toe from './Toe';
import { LocaleContext, locales, useContentObjectTreeContext } from '../contexts';
import { SiteFooterContentTree } from '../types/constent_object_trees';

function Footer() {
    const locale = useContext(LocaleContext);

    const contentTreeContext = useContentObjectTreeContext();

    return (
        <div>
            <div className="container-fluid py-4 bg-dark text-white text-center">

                <h3>{locale === locales.sv ? 'Hitta hit!' : 'Find us!'}</h3>

                {/* {content.items.address.text} */}

                <GoogleMap />

            </div>
            <Toe
                // webmaster={content.items.webmaster.text}
                // currYear={content.items.currYear.text}
                webmaster={'content.items.webmaster.text'}
                currYear={''}
            />
        </div>
    );
}

export default Footer;
