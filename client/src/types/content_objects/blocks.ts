import { ContentImage, ContentList, ContentObject, ContentText } from '../api_object_types';
import { ChangeKeyType } from '../general';

export type HeaderBlock = ContentText & {
    attributes: {
        blockType: 'heading',
        size: 1 | 2 | 3 | 4 | 5
    }
}
export type RichTextBlock = ContentText & {
    attributes: {
        blockType: 'richText'
    }
}

export type ImageBlock = ContentImage & {
    attributes: {
        blockType: 'image',
        alignment: 'left' | 'center' | 'right',
        width: string
    }
}

export type BlockType = 'heading' | 'richText' | 'image'

export type Block = ContentObject & {
    attributes: {
        blockType: BlockType
    }
}

export type BlockFeed = ChangeKeyType<ContentList, 'items', Block[]>
