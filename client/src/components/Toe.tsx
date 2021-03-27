import React from 'react';
import { ContentText } from '../types/api_object_types';
import TextCO from './content_objects/TextCO';

type ToeProps = {
    webmaster: ContentText;
    currYear: ContentText;
}

export default function Toe({ webmaster, currYear } : ToeProps) {
    return (
        <div className="container-fluid py-4 bg-dark text-white text-center"
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        >
            <div style={{ paddingRight: '2rem' }}>
                <span>{'© '}</span><TextCO textCO={currYear} /><span>{' Fysiksektionen, organisationsnummer 802411-8948'}</span>
            </div>
            <div style={{ fontWeight: 'bold', paddingLeft: '2rem' }}>
                <span>{'Webmaster: '}</span><TextCO textCO={webmaster} /><span>{' – webmaster@f.kth.se'}</span>
            </div>
        </div>
    );
}
