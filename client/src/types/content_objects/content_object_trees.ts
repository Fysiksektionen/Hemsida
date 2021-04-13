import { ContentDict, ContentImage, ContentText } from '../api_object_types';

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
