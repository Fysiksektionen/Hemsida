import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { OrangeInfoBoxCT } from '../../types/content_objects/content_trees/pages';
import InfoBox2COR from '../../components/content_object_renderers/InfoBox2COR';

/**
 * Component of the InfoBoxes on the start page.
 * @param content List of ContentDicts to render
 * @constructor
 */
export default function OrangeInfoBoxes(content: OrangeInfoBoxCT[]) {
    return (
        <div>
            <div className="d-lg-none">
                <Col className='m-0 p-0 text-white'>
                    <InfoBox2COR content={content[0]} />
                    <InfoBox2COR content={content[1]} />
                    <InfoBox2COR content={content[2]} />
                </Col>
            </div>
            <div className="d-none d-lg-block">
                <Row className="m-0 p-0 text-white">
                    <Col className="p-0">
                        <InfoBox2COR content={content[0]} />
                    </Col>
                    <Col className="p-0">
                        <InfoBox2COR content={content[1]} />
                    </Col>
                    <Col className="p-0">
                        <InfoBox2COR content={content[2]} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
