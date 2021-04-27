import React from 'react';
import {
    Block,
    BlockType,
    ColumnsBlock,
    ImageBlock,
    RichTextBlock,
    RichTextBlockTypes
} from '../../../types/content_objects/blocks';
import RichTextCOR from './RichTextCOR';
import ImageBlockCOR from './ImageBlockCOR';
import ColumnsBlockCOR from './ColumnsBlockCOR';

/**
 * Component returning the correct component for a given Block based on block type.
 * @param block The block
 * @constructor
 */
export default function BlockCOR({ block }: {block: Block}) {
    if ((RichTextBlockTypes as BlockType[]).includes(block.attributes.blockType)) {
        return <RichTextCOR content={block as RichTextBlock} />;
    } else if (block.attributes.blockType === 'image') {
        return <ImageBlockCOR content={block as ImageBlock}/>;
    } else if (block.attributes.blockType === 'columns') {
        return <ColumnsBlockCOR content={block as ColumnsBlock}/>;
    } else {
        return <>{block.attributes.blockType}</>;
    }
}
