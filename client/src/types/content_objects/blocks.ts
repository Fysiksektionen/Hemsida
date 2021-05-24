import { ContentImage, ContentList, ContentObject, ContentText, newContentList } from '../api_object_types';
import { ChangeKeyType } from '../general';

/* -----------------------
         Rich text
 ------------------------- */
export type HeadingBlock = ContentText & {
    attributes: {
        blockType: 'heading',
        richTextEditorType: 'only-headings' | 'none'
    }
}

export type BodyTextBlock = ContentText & {
    attributes: {
        blockType: 'bodyText',
        richTextEditorType: 'only-marks' | 'body-text' | 'all' | 'none'
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
           Table
 ------------------------- */

export type TableBlock = newContentList<TableRow> & {
    attributes: {
        blockType: 'table',
        width: number,
        height: number
    }
}

export type TableRow = newContentList<TableCell>;

export type TableCell = ContentText & {
    attributes: {
        headerStyle?: boolean
    }
};

/* -----------------------
          General
 ------------------------- */
export type Block = RichTextBlock | ImageBlock | TableBlock;
export type BlockType = Block['attributes']['blockType'];
export type BlockFeed = ChangeKeyType<ContentList, 'items', Block[]>;
