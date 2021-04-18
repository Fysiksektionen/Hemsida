import React from 'react';
import { Row } from 'react-bootstrap';
import { ImageBlock } from '../../../types/content_objects/blocks';
import ImageCOR from '../ImageCOR';

/**
 * A block renderer for ImageBlocks. I.e used in BlockFeed
 * @param content The ImageBlock to show and edit.
 * @constructor
 */
export default function ImageBlockCOR({ content }: {content: ImageBlock}) {
    const alignments = {
        left: 'justify-content-start',
        center: 'justify-content-center',
        right: 'justify-content-end'
    };

    const justificationClass = alignments[content.attributes.alignment];

    return (
        <Row className={justificationClass + ' w-100'}>
            <ImageCOR content={content} width={content.attributes.width}/>
        </Row>
    );
}
