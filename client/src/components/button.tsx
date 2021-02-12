import React from 'react';

export interface IButton {
    text: string,
    color: string
}

function Button(props: IButton) {
    // TODO: Temporary, should be improved in another branch
    return (
        <button style={{color: "white", backgroundColor: props.color, fontFamily: "MONOSPACE"}}>{props.text}</button>
    )
}

export default Button;
