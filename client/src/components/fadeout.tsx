import React from 'react';
import './fadeout.css'


export interface IFadeOut {
  fade: boolean,
  color: string,
  midpoint: string,
}

function FadeOut(props : IFadeOut & {children?: React.ReactNode}) {
  return (
    <div className="our-fade-anchor">
      {props.children}
      {props.fade && (<div className="our-fade" style={{background: `linear-gradient(transparent, ${props.midpoint}, ${props.color})`}} />)}
    </div>
    )
}

export default FadeOut