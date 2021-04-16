import { Block, BlockType, ImageBlock, RichTextBlock, RichTextBlockTypes } from '../../../types/content_objects/blocks';
import RichTextCOR from './RichTextCOR';
import ImageBlockCOR from './ImageBlockCOR';
import React from 'react';

export default function BlockCOR({ block }: {block: Block}) {
    if ((RichTextBlockTypes as BlockType[]).includes(block.attributes.blockType)) {
        return <RichTextCOR content={block as RichTextBlock} />;
    } else if (block.attributes.blockType === 'image') {
        return <ImageBlockCOR content={block as ImageBlock}/>;
    } else {
        return <>{block.attributes.blockType}</>;
    }
}
