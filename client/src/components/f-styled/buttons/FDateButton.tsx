import React from 'react';
import { Button } from '@material-ui/core';
import { FButtonProps } from './FButton';

interface IFDateButtonProps extends FButtonProps {
  date: String; // TODO: change to some sort of Date-object
}

export default function FDateButton({ text, date, version = 'light', style, props } : IFDateButtonProps) {
    let colorString: String = '';
    let bgColor: 'lightgray' | undefined;
    switch (version) {
    case 'light':
        colorString = 'text-dark';
        bgColor = 'lightgray';
        break;
    case 'dark':
        colorString = 'bg-dark text-white';
        bgColor = undefined;
        break;
    }
    return (
        <Button
            className={colorString + ' text-center px-3 py-2 m-1'}
            style={{
                minWidth: '16rem',
                textTransform: 'none',
                backgroundColor: bgColor,
                ...style
            }}
            {...props}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ fontWeight: 'bold' }}>
                    {text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '80%' }}>
                    {date}
                </div>
            </div>
        </Button>
    );
}
