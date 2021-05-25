import {
    ContentDict,
    ContentImage,
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
export type OrangeInfoBoxCT = newContentDict<
    {
        title: RichTextBlock,
        text: RichTextBlock,
        button: ContentText & {
            attributes: {
                link: string
            }
        }
    },
    {
        color: string
    }
>;

export type FrontPageItems = {
    orangeBoxes: newContentList<OrangeInfoBoxCT>,
    sponsorLogo: ContentImage
}

export type FrontPageCT = newContentDict<FrontPageItems>;

/* -----------------------
           namnd
 ------------------------- */
export type NamndPageCT = ContentDict & {
    items: {
        title: HeadingBlock,
        content: BlockFeed
    }
}
