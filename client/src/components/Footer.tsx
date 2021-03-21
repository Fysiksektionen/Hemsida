import React from 'react';
import GoogleMap from './GoogleMap';
import './Footer.css';
import Toe from './Toe';
import {LocaleContext, locales} from "../contexts";

type Props = {
    content_sv: NodeJS.Dict<string>,
    content_en: NodeJS.Dict<string>
}

function Footer(props: Props) {
    const locale = useContext(LocaleContext);
    const content = locale === locales.sv ? props.content_sv : props.content_en;

    return (
        <div>
            <div className="container-fluid py-4 bg-dark text-white text-center">

                <h3>{locale === locales.sv ? "Hitta hit!" : "Find us!"}</h3>

                {content["address"]}

                <GoogleMap />

            </div>
            <Toe
                webmaster={content["webmaster"]!}
                currYear={content["currYear"]!}
            />
        </div>
    )
}

export default Footer;
