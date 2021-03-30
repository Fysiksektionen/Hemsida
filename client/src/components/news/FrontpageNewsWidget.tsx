import React from 'react';
import NewsItemCompact from './NewsItemCompact';
import NewsFeedTiny from './NewsFeedTiny';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DummyData, DummyData2 } from '../../mock_data/mock_NewsWidget';

function NewsWidget() {
    return (
        <Col xs={12} xl={10}>
            <Row>
                <h1 className="mb-5 mb-xl-6 font-weight-bolder" style={{ fontSize: '3em' }}>Nyheter</h1>
            </Row>
            <Row>
                <Col className="col-7 pr-0"> <NewsItemCompact {...DummyData2}/> </Col>
                <Col className="col-5 pl-0"> <NewsFeedTiny items={DummyData}/> </Col>
            </Row>
        </Col>
    );
}

export default NewsWidget;
