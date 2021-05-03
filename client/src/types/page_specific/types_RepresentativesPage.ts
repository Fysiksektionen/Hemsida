import { ContentDict, ContentImage, ContentList, ContentText } from '../api_object_types';

export type RepresentativesContent = {
    infoBox: {
        title: string,
        text: string
    },
    //boardMembers: BoardMembers
}

export type RepresentativesPageContentTree = ContentDict & {

    items: {
        infoBox: infoBox
       // boardMembers: BoardMembers
    }
}

export type infoBox = ContentDict & {
    items: {
        title: ContentText,
        text: ContentText
    }
}

type Member = ContentDict & {
    items : {
        role: ContentText,
        name: ContentText,
        yearCode: ContentText,
        email: ContentText
    }
}

export type BoardMembers = ContentDict & {
    items: {
        boardTitle: ContentText,
        boardEmail: ContentText,

        members: ContentList & {
            items: Member[]
        }
    }
}

