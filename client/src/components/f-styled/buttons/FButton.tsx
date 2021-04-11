import React from 'react';
import { Button, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export type FButtonProps = {
    text: String;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    version?: 'light' | 'dark';
    style?: React.CSSProperties | undefined;
    href?: string,
    onClick?: (event: React.MouseEvent) => void,
    props?: any;
}

export default function FButton({ text, Icon, version = 'light', style, href, onClick, ...props } : FButtonProps) {
    let bgColor: string = 'white';
    let textColor: string = 'black';
    switch (version) {
    case 'light':
        bgColor = 'F-light-gray';
        textColor = 'black';
        break;
    case 'dark':
        bgColor = 'F-dark-gray';
        textColor = 'white';
        break;
    }

    if (onClick === undefined) {
        onClick = () => {};
    }

    return (
        <Button
            className={'text-center px-3 py-2 m-1 text-' + textColor + ' bg-' + bgColor}
            endIcon={Icon ? <Icon/> : undefined}
            style={{
                minWidth: '8rem',
                textTransform: 'none',
                fontWeight: 'bold',
                ...style
            }}
            onClick={onClick}
            href={href}
            {...props}
        >
            <div>{text}</div>
        </Button>
    );
}
