import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NewsPageMinimal } from '../../types/news';
import { Image } from 'react-bootstrap';

export type NewsItemTinyProps = {
    thumbnail: string
    title: string
    published: Date
}

function NewsItemTiny(props : NewsPageMinimal) {
    return (
        <>
            <Col className="col-5">
                <Image src={props.image.href} fluid alt='' className='rounded-left'/>
            </Col>
            <Col className="col-6">
                <div className='font-weight-bold tight-line-height mt-3'>{props.title}</div>
                <small className="position-absolute" style={{ bottom: '1rem' }}>{props.publishedAt}</small>
            </Col>
        </>
    );
}

export default NewsItemTiny;
