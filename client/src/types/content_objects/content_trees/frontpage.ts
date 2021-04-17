import { ContentDict, ContentImage, ContentList, ContentText } from '../../api_object_types';
import { HeadingBlock, RichTextBlock } from '../blocks';

export type OrangeInfoBoxCT = ContentDict & {
    attributes: {
        color: string
    },
    items: {
        title: HeadingBlock,
        text: RichTextBlock,
        button: ContentText & {
            attributes: {
                link: string
            }
        }
    }
}

export type FrontPageCT = ContentDict & {
    items: {
        orangeBoxes: ContentList & {
            items: OrangeInfoBoxCT[]
        },
        sponsorLogo: ContentImage
    }
}
