import React from 'react';
import { EditorialModeContext } from '../../../contexts';
import BlockFeedCOE from '../../content_object_editors/BlockFeedCOE';
import { Block, BlockFeed, HeaderBlock, ImageBlock, RichTextBlock } from '../../../types/content_objects/blocks';
import { Col, Row } from 'react-bootstrap';
import ImageBlockCOR from './ImageBlockCOR';
import RichTextCOR from './RichTextCOR';
import HeaderBlockCOR from './HeaderBlockCOR';

export function BlockToBlockCOR({ block }: {block: Block}) {
    if (block.attributes.blockType === 'heading') {
        return <HeaderBlockCOR content={block as HeaderBlock} />;
    } else if (block.attributes.blockType === 'richText') {
        return <RichTextCOR content={block as RichTextBlock} />;
    } else if (block.attributes.blockType === 'image') {
        return <ImageBlockCOR content={block as ImageBlock} />;
    } else {
        return <></>;
    }
}

export type BlockFeedCORProps = {
    content: BlockFeed
}

export default function BlockFeedCOR({ content }: BlockFeedCORProps) {
    return (
        <EditorialModeContext.Consumer>
            {(edit) => (
                edit
                    ? <BlockFeedCOE content={content} />
                    : <Col>
                        {content.items.map((obj, index) => {
                            return (
                                <Row key={index}>
                                    <BlockToBlockCOR block={obj} />
                                </Row>
                            );
                        })}
                    </Col>
            )}
        </EditorialModeContext.Consumer>
    );
}
