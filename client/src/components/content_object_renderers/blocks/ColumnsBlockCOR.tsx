import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ColumnsBlock } from '../../../types/content_objects/blocks';
import BlockFeedCOR from '../BlockFeedCOR';

/**
 * A block renderer for ColumnsBlocks. I.e used in BlockFeed
 * @param content The ColumnsBlock to show and edit.
 * @constructor
 */
export default function ColumnsBlockCOR({ content }: {content: ColumnsBlock}) {
    const split = content.attributes.split;
    const validSplit = Number.isInteger(split) && split >= 1 && split <= 11;

    return (validSplit
        ? <>
            <Col xs={12} md={split}>
                <Row>
                    <BlockFeedCOR content={content.items.left} />
                </Row>
            </Col>
            <Col xs={12} md={12 - split}>
                <Row>
                    <BlockFeedCOR content={content.items.right} />
                </Row>
            </Col>
        </>
        : <Col className='text-center'>{content.attributes.blockType}</Col>
    );
}
