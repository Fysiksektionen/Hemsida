import React from 'react';
import { ContentObject } from '../types/api_object_types';
import { NamndPageCT } from '../types/content_objects/content_trees/pages';
import BlockFeedCOR from '../components/content_object_renderers/BlockFeedCOR';
import { Col, Container, Row } from 'react-bootstrap';
import BlockCOR from '../components/content_object_renderers/blocks/BlockCOR';
import { EditorialModeContext } from '../contexts';

/**
 * Page template of `namnd` pageType. Requires title and includes a BlockFeed as main content.
 * @param props The ContentObject of the page.
 * @constructor
 */
export default function NamndPage(props: ContentObject) {
    const content = props as NamndPageCT;

    return (
        <EditorialModeContext.Consumer>
            {edit => (
                <Container>
                    <Row className='justify-content-center'>
                        <Col xl={!edit ? 8 : 10} md={10} xs={11}>
                            <Row className='mb-5'>
                                <h1>
                                    <BlockCOR block={content.items.title} />
                                </h1>
                            </Row>
                            <Row>
                                <BlockFeedCOR content={content.items.content} />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )}
        </EditorialModeContext.Consumer>
    );
}
