import React from 'react';
import Button from 'react-bootstrap/Button';

export interface IButton {
    text: string,
    type: string,
    class?: string,
    onClick?: Function,
}

function OurButton(props: IButton) {
    // TODO: Temporary, should be improved in another branch
    return (
        <Button className={props.class} variant={props.type} onClick={() => { if (props.onClick) props.onClick(); }}>{props.text}</Button>
    );
}

export default OurButton;
