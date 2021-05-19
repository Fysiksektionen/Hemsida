import {
    ContentDict,
    ContentImage,
    ContentList,
    ContentText,
    newContentDict,
    newContentList
} from '../../api_object_types';
import { BlockFeed, HeadingBlock, RichTextBlock } from '../blocks';

/**
 *# ContentTrees used in pageTemplates. Commented sections use the related pageType as title.
 */

/* -----------------------
         frontpage
 ------------------------- */
export type OrangeInfoBoxCT = newContentDict<{
    title: HeadingBlock,
    text: RichTextBlock,
    button: ContentText & {
        attributes: {
            link: string
        }
    }
}>;

export type FrontPageCT = newContentDict<{
    orangeBoxes: newContentList<OrangeInfoBoxCT>,
    sponsorLogo: ContentImage
}>;

/* -----------------------
           namnd
 ------------------------- */
export type NamndPageCT = ContentDict & {
    items: {
        title: HeadingBlock,
        content: BlockFeed
    }
}
