import React from 'react';
import Banner from '../components/Banner';
import OrangeInfoBoxes from '../components/OrangeInfoBoxes';
import NewsWidget from '../components/news/FrontpageNewsWidget';
import placeholder from '../mediafiles/placeholder_images/placeholder.jpg';
import { ContentObject } from '../types/api_object_types';
import { FrontPageCT } from '../types/content_object_trees';
import { Col, Row } from 'react-bootstrap';
import ImageCOR from '../components/content_object_renderers/ImageCOR';

function Frontpage(props: ContentObject) {
    const content = props as FrontPageCT;

    return (
        <div>
            <Banner image={placeholder} />
            <Col>
                <Row>
                    <OrangeInfoBoxes {...content.items.orangeBoxes.items}/>
                </Row>
                <Row className="py-6 p-5 justify-content-center bg-F-super-light-gray">
                    <NewsWidget />
                </Row>
                <Row className='py-6 p-5 justify-content-center'>
                    <Col xs={12} xl={10}>
                        <Row>
                            <h1 className="mb-5 mb-xl-6 font-weight-bolder" style={{ fontSize: '3em' }}>Kommande event</h1>
                        </Row>
                        <Row>
                            {/* Insert events */}
                        </Row>
                    </Col>
                </Row>
                <Row className='justify-content-center bg-F-super-light-gray'>
                    <Col xs={6} sm={5} md={4} lg={3} xl={2} className='text-center'>
                        <div className='font-weight-bold pt-5'>Huvudsponsor</div>
                        <ImageCOR imageCO={content.items.sponsorLogo} fluid className='pb-5 pt-4 pt-md-5' />
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default Frontpage;
