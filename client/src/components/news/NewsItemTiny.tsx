import React from 'react';
import Container from 'react-bootstrap/Container';
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
        <Container>
            <Row>
                <Col className="col-5 pl-0">
                    <Image src={props.image.href} width={150} alt='' />
                </Col>
                <Col className="col-7 pt-2 pl-0">
                    <h6>{props.title}</h6>
                    <small className="position-absolute" style={{ bottom: '0.5rem' }}>{props.publishedAt}</small>
                </Col>
            </Row>
        </Container>
    );
}

export default NewsItemTiny;
