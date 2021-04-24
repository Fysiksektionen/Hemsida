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


type d = (ContentDict & {
    items: {
        title: ContentText,
        text: ContentText,
        actionBtnText: ContentText
    }
});
export type FrontPageContentTree = ContentDict & {
    items: {
        orangeBoxes: ContentList & {
            items: d[]
        },
        sponsorLogo: ContentImage
    }
}
