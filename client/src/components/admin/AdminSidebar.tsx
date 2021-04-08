import React, { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';
import { Col } from 'react-bootstrap';

export default function AdminSidebar(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {side: 'right'|'left'}) {
    const classNameDefault = 'd-flex flex-column';
    const className = props.className ? props.className + ' ' + classNameDefault : classNameDefault;

    const borderSide = props.side === 'right' ? 'left' : 'right';

    return (
        <Col lg={3} xl={2} {...props} className={className}>
            <div style={{ height: '25px' }}/>
            <div className={'border-' + borderSide + ' border-dark flex-grow-1 px-4'}>
                {props.children}
            </div>
            <div style={{ height: '100px' }}/>
        </Col>
    );
}
