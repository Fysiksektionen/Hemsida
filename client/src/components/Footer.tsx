import React from 'react';
import GoogleMap from './GoogleMap';
import Toe from './Toe';
import { LocaleContext, locales } from '../contexts';
import { SiteFooterCT } from '../types/content_object_trees';
import TextCOR from './content_object_renderers/TextCOR';

type FooterProps = {
    content: SiteFooterCT
}

function Footer({ content }: FooterProps) {
    return (
        <LocaleContext.Consumer>
            {locale =>
                <div>
                    <div className="py-4 bg-dark text-white text-center">

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
