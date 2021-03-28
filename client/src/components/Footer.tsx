import React from 'react';
import GoogleMap from './GoogleMap';
import './Footer.css';
import Toe from './Toe';
import { LocaleContext, locales } from '../contexts';
import { SiteFooterContentTree } from '../types/constent_object_trees';
import TextCOR from './content_object_renderers/TextCOR';

type FooterProps = {
    content: SiteFooterContentTree
}

function Footer({ content }: FooterProps) {
    return (
        <LocaleContext.Consumer>
            {locale =>
                <div>
                    <div className="container-fluid py-4 bg-dark text-white text-center">

                        <h3>{locale === locales.sv ? 'Hitta hit!' : 'Find us!'}</h3>

                        <TextCOR textCO={content.items.address} />

                        <GoogleMap />

                    </div>
                    <Toe
                        webmaster={content.items.webmaster}
                        currYear={content.items.currYear}
                    />
                </div>
            }
        </LocaleContext.Consumer>
    );
}

export default Footer;
