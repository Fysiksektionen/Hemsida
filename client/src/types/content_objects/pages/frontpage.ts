import { ContentDict, ContentImage, ContentList, ContentText } from '../../api_object_types';

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
