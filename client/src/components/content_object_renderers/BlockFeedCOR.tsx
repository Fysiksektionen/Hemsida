import React from 'react';
import { EditorialModeContext } from '../../contexts';
import BlockFeedCOE from './BlockFeedCOE';
import { BlockFeed } from '../../types/content_objects/blocks';
import { Col, Row } from 'react-bootstrap';
import BlockCOR from './blocks/BlockCOR';

/**
 * Renders or allows for editing of a BlockFeed object.
 * @param content The block feed object to render/edit.
 * @constructor
 */
export default function BlockFeedCOR({ content }: { content: BlockFeed }) {
    return (
        <EditorialModeContext.Consumer>
            {(edit) => (
                edit
                    ? <BlockFeedCOE content={content} />
                    : <Col>
                        {content.items.map((obj, index) => {
                            return (
                                <Row key={index}>
                                    <BlockCOR block={obj} />
                                </Row>
                            );
                        })}
                    </Col>
            )}
        </EditorialModeContext.Consumer>
    );
}
