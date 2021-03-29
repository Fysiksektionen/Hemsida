import React from 'react';
import { Button, SvgIconTypeMap } from '@material-ui/core';
import { FButtonProps } from './FButton';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

type FLargeIconButtonProps = FButtonProps & {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

export default function FLargeIconButton({ text, Icon, version = 'light', style, props } : FLargeIconButtonProps) {
    let colorString: String;
    switch (version) {
    case 'light':
        colorString = 'bg-white text-dark';
        break;
    case 'dark':
        colorString = 'bg-dark text-white';
        break;
    }
    return (
        <Button
            className={colorString + ' text-center px-3 py-2 m-1'}
            variant="outlined"
            style={{
                minWidth: '12rem',
                minHeight: '12rem',
                textTransform: 'none',
                fontWeight: 'bold',
                ...style
            }}
            {...props}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Icon
                    className="my-1"
                    style={{
                        fontSize: '5rem'
                    }}
                />
                <div className="my-1">
                    {text}
                </div>
            </div>
        </Button>
    );
}
