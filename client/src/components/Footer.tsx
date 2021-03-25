import React, { useContext, useEffect } from 'react';
import GoogleMap from './GoogleMap';
import './Footer.css';
import Toe from './Toe';
import { LocaleContext, locales } from '../contexts';
import { SiteFooterContentTree } from '../types/constent_object_trees';

type Props = {
    contentSv: SiteFooterContentTree,
    contentEn: SiteFooterContentTree
}

function Footer(props: Props) {
    const locale = useContext(LocaleContext);
    const content = locale === locales.sv ? props.contentSv : props.contentEn;

    return (
        <div>
            <div className="container-fluid py-4 bg-dark text-white text-center">

                <h3>{locale === locales.sv ? 'Hitta hit!' : 'Find us!'}</h3>

                {content.items.address.text}

                <GoogleMap />

            </div>
            <Toe
                webmaster={content.items.webmaster.text}
                currYear={content.items.currYear.text}
            />
        </div>
    );
}

export default Footer;
