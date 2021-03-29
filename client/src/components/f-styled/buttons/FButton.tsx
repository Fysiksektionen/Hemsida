import React from 'react';
import { Button, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export type FButtonProps = {
    text: String;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    version?: 'light' | 'dark';
    style?: React.CSSProperties | undefined;
    props?: any;
}

export default function FButton({ text, Icon, version = 'light', style, ...props } : FButtonProps) {
    let bgColor: string = 'white';
    let textColor: string = 'black';
    switch (version) {
    case 'light':
        bgColor = 'var(--F-light-gray)';
        textColor = 'black';
        break;
    case 'dark':
        bgColor = 'var(--F-dark-gray)';
        textColor = 'white';
        break;
    }
    return (
        <Button
            className={'text-center px-3 py-2 m-1'}
            endIcon={Icon ? <Icon/> : undefined}
            style={{
                backgroundColor: bgColor,
                color: textColor,
                minWidth: '8rem',
                textTransform: 'none',
                fontWeight: 'bold',
                ...style
            }}
            {...props}
        >
            <div>{text}</div>
        </Button>
    );
}
