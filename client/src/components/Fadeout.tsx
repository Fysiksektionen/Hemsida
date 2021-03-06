import React from 'react';
import './Fadeout.css';

export type FadeOut = {
    fade: boolean,
    color: string,
    midpoint: string,
}

function Fadeout(props : FadeOut & {children?: React.ReactNode}) {
    return (
        <div className="our-fade-anchor">
            {props.children}
            {props.fade && (<div className="our-fade" style={{ background: `linear-gradient(transparent, ${props.midpoint}, ${props.color})` }} />)}
        </div>
    );
}

export default Fadeout;
