import { ContentDict, ContentImage, ContentList, ContentText } from './api_object_types';

/**
 * File defining content trees.
 */

export type SiteHeaderContentTree = ContentDict & {
    items: {
        name: ContentText,
        logo: ContentImage
    }
}

export type SiteFooterContentTree = ContentDict & {
    items: {
        webmaster: ContentText,
        currYear: ContentText,
        address: ContentText
    }
}

export type OrangeInfoBoxContentTree = ContentDict & {
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

export type FrontPageContentTree = ContentDict & {
    items: {
        orangeBoxes: ContentList & {
            items: OrangeInfoBoxContentTree[]
        },
        sponsorLogo: ContentImage
    }
}
