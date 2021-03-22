import React from 'react';
import NewsItemCompact from './NewsItemCompact';
import NewsFeedTiny from './NewsFeedTiny';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DummyData, DummyData2 } from '../../mock_data/mock_NewsWidget';

function NewsWidget() {
    return (
        <div>
            <h1 className="pl-2 mb-4">Nyheter</h1>
            <Container>
                <Row>
                    <Col className="col-7 pr-0"> <NewsItemCompact {...DummyData2}/> </Col>
                    <Col className="col-5 pl-0"> <NewsFeedTiny items={DummyData}/> </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NewsWidget;
