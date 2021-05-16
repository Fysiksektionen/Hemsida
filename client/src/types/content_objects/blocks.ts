import { ContentImage, ContentList, ContentText } from '../api_object_types';
import { ChangeKeyType } from '../general';

/* -----------------------
         Rich text
 ------------------------- */
// TODO: bör inte vara två blocktyper...
export type HeadingBlock = ContentText & {
    attributes: {
        blockType: 'heading',
        richTextEditorType: 'only-headings' | 'none'
    }
}

export type BodyTextBlock = ContentText & {
    attributes: {
        blockType: 'bodyText',
        richTextEditorType: 'only-marks' | 'body-text' | 'all' | 'none' // TODO: Add Capitalized type
    }
}

export type RichTextBlock = HeadingBlock | BodyTextBlock
export type RichTextBlockType = RichTextBlock['attributes']['blockType'];
export const RichTextBlockTypes: RichTextBlockType[] = ['heading', 'bodyText'];

/* -----------------------
           Image
 ------------------------- */
export type ImageBlock = ContentImage & {
    attributes: {
        blockType: 'image',
        alignment: 'left' | 'center' | 'right',
        width: string
    }
}

/* -----------------------
          Columns
 ------------------------- */
export type ColumnsBlock = ContentList & {
    attributes : {
        blockType: 'columns'
        sizes: number[]
    },
    items: BlockFeed[]
}

/* -----------------------
          General
 ------------------------- */
export type Block = RichTextBlock | ImageBlock | ColumnsBlock;
export type BlockType = Block['attributes']['blockType'];
export type BlockFeed = ChangeKeyType<ContentList, 'items', Block[]>;
