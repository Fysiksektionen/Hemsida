import React from 'react';
import { ContentObject } from '../types/api_object_types';
import { NamndPageCT } from '../types/content_object_trees';
import ContentObjectFeedCOR from '../components/content_object_renderers/ContentObjectFeedCOR';
import TextCOR from '../components/content_object_renderers/TextCOR';
import { Col, Container, Row } from 'react-bootstrap';

export default function NamndPage(props: ContentObject) {
    const content = props as NamndPageCT;

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xl={6} lg={8} md={10} xs={11}>
                    <Row className='mb-5'>
                        <h1>
                            <TextCOR textCO={content.items.title} />
                        </h1>
                    </Row>
                    <Row>
                        <ContentObjectFeedCOR content={content.items.content} />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
