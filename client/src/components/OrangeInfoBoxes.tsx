import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { OrangeInfoBoxCT } from '../types/content_objects/pages/frontpage';
import InfoBoxCOR from './content_object_renderers/InfoBoxCOR';

export default function OrangeInfoBoxes(content: OrangeInfoBoxCT[]) {
    return (
        <div>
            <div className="d-lg-none">
                <Col className='m-0 p-0 text-white'>
                    <InfoBoxCOR content={content[0]} />
                    <InfoBoxCOR content={content[1]} />
                    <InfoBoxCOR content={content[2]} />
                </Col>
            </div>
            <div className="d-none d-lg-block">
                <Row className="m-0 p-0 text-white">
                    <Col className="p-0">
                        <InfoBoxCOR content={content[0]} />
                    </Col>
                    <Col className="p-0">
                        <InfoBoxCOR content={content[1]} />
                    </Col>
                    <Col className="p-0">
                        <InfoBoxCOR content={content[2]} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
