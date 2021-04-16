import { ContentImage, ContentList, ContentText } from '../api_object_types';
import { ChangeKeyType } from '../general';

export type HeadingBlock = ContentText & {
    attributes: {
        blockType: 'heading',
        richTextEditorType: 'only-headings' | 'none'
    }
}

export type BodyTextBlock = ContentText & {
    attributes: {
        blockType: 'bodyText',
        richTextEditorType: 'body-text' | 'all' | 'none'
    }
}

export type RichTextBlock = HeadingBlock | BodyTextBlock
export type RichTextBlockType = RichTextBlock['attributes']['blockType'];
export const RichTextBlockTypes: RichTextBlockType[] = ['heading', 'bodyText'];

export type ImageBlock = ContentImage & {
    attributes: {
        blockType: 'image',
        alignment: 'left' | 'center' | 'right',
        width: string
    }
}

export type Block = RichTextBlock | ImageBlock;
export type BlockType = Block['attributes']['blockType'];
export type BlockFeed = ChangeKeyType<ContentList, 'items', Block[]>;
