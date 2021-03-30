import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { OrangeInfoBoxContentTree } from '../types/content_object_trees';
import InfoBoxCOR from './content_object_renderers/InfoBoxCOR';

export default function OrangeInfoBoxes(content: OrangeInfoBoxContentTree[]) {
    return (
        <div>
            <div className="d-lg-none">
                <Col className='m-0 p-0 text-white'>
                    <InfoBoxCOR content={content[0]} bgColor={content[0].attributes.color}/>
                    <InfoBoxCOR content={content[1]} bgColor={content[1].attributes.color}/>
                    <InfoBoxCOR content={content[2]} bgColor={content[2].attributes.color}/>
                </Col>
            </div>
            <div className="d-none d-lg-block">
                <Row className="m-0 p-0 text-white">
                    <Col className="p-0">
                        <InfoBoxCOR content={content[0]} bgColor={content[0].attributes.color}/>
                    </Col>
                    <Col className="p-0">
                        <InfoBoxCOR content={content[1]} bgColor={content[1].attributes.color}/>
                    </Col>
                    <Col className="p-0">
                        <InfoBoxCOR content={content[2]} bgColor={content[2].attributes.color}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
