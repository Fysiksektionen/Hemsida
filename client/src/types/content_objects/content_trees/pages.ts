import { ContentDict, ContentImage, ContentList, ContentText } from '../../api_object_types';
import { BlockFeed, HeadingBlock, RichTextBlock } from '../blocks';

/**
 *# ContentTrees used in pageTemplates. Commented sections use the related pageType as title.
 */

/* -----------------------
         frontpage
 ------------------------- */
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

/* -----------------------
           namnd
 ------------------------- */
export type NamndPageCT = ContentDict & {
    items: {
        title: HeadingBlock,
        content: BlockFeed
    }
}
