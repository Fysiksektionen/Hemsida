import { ContentDict, ContentImage, ContentMenu, ContentText } from '../../api_object_types';

/**
 * ContentTrees of the site object
 */

export type SiteHeaderCT = ContentDict & {
    items: {
        logo: ContentImage
        midMenu: ContentMenu
        mainMenu: ContentMenu
    }
}

export type SiteFooterCT = ContentDict & {
    items: {
        webmaster: ContentText,
        currYear: ContentText,
        address: ContentText
    }
}
