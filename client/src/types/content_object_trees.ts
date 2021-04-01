import { ContentDict, ContentImage, ContentList, ContentText } from './api_object_types';

/**
 * File defining content trees.
 */

export type SiteHeaderCT = ContentDict & {
    items: {
        name: ContentText,
        logo: ContentImage
    }
}

export type SiteFooterCT = ContentDict & {
    items: {
        webmaster: ContentText,
        currYear: ContentText,
        address: ContentText
    }
}

export type OrangeInfoBoxCT = ContentDict & {
    attributes: {
        color: string
    },
    items: {
        title: ContentText,
        text: ContentText,
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
