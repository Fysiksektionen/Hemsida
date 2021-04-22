import React from 'react';
import NewsItemLage from './NewsItemLarge';
import NewsFeedSmall from './NewsFeedTiny';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DummyData, DummyData2 } from '../../mock_data/mock_NewsWidget';
import OffsetTitle from '../OffsetTitle';

function FrontpageNewsWidget() {
    return (
        <Col xs={12} xl={10}>
            <OffsetTitle title="Nyheter" offsetLeft={2}>
                <Row>
                    <Col className="col-7 px-4">
                        <NewsItemLage {...DummyData2}/>
                    </Col>
                    <Col className="col-5 px-4">
                        <NewsFeedSmall items={DummyData}/>
                    </Col>
                </Row>
            </OffsetTitle>
        </Col>
    );
}

export default FrontpageNewsWidget;
