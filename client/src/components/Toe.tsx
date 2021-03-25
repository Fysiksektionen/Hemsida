import React from 'react';

type ToeProps = {
    webmaster: string;
    currYear: string;
}

export default function Toe({ webmaster, currYear } : ToeProps) {
    return (
        <div className="container-fluid py-4 bg-dark text-white text-center"
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        >
            <div style={{ paddingRight: '2rem' }}>
                {'© ' + currYear + ' Fysiksektionen, organisationsnummer 802411-8948'}
            </div>
            <div style={{ fontWeight: 'bold', paddingLeft: '2rem' }}>
                {'Webmaster: ' + webmaster + ' – webmaster@f.kth.se'}
            </div>
        </div>
    );
}
