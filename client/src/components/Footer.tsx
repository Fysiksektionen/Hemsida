import React, { useContext } from 'react';
import GoogleMap from './GoogleMap';
import './Footer.css';
import Toe from './Toe';
import { LocaleContext, locales } from '../contexts';
import { ContentDict, ContentObject, ContentText } from '../types/api_object_types';

type Props = {
    contentSv: ContentObject,
    contentEn: ContentObject
}

function Footer(props: Props) {
    const locale = useContext(LocaleContext);
    const content = (locale === locales.sv ? props.contentSv : props.contentEn) as ContentDict;

    return (
        <div>
            <div className="container-fluid py-4 bg-dark text-white text-center">

                <h3>{locale === locales.sv ? 'Hitta hit!' : 'Find us!'}</h3>

                {(content.items.address as ContentText).text}

                <GoogleMap />

            </div>
            <Toe
                webmaster={(content.items.webmaster as ContentText).text}
                currYear={(content.items.currYear as ContentText).text}
            />
        </div>
    );
}

export default Footer;
