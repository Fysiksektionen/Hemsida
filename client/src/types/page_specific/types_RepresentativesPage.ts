import {
    ContentText,
    newContentDict,
    newContentList
} from '../api_object_types';

export type RepresentativesPageContentTree = newContentDict<{
    header: ContentText,
    introText: ContentText,
    sections: newContentList<newContentDict<sectionFields>>
}>;

// Could be "styrelsen" or "nämnder"
export type sectionFields = {
    name: ContentText,
    email?: ContentText,
    subsections: newContentList<newContentDict<subSectionFields>>
}

// Could be a specifc nämnd of nämnder. If name is left empty then neither name nor email should be rendered
export type subSectionFields = {
    name?: ContentText,
    email?: ContentText
    members: newContentList<newContentDict<memberFields>>
}

export type memberFields = {
    role: ContentText,
    name: ContentText,
    yearCode: ContentText,
    email: ContentText,
}
