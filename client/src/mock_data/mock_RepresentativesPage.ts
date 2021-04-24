import { APIResponse } from "../types/general";
import {ContentText, Page} from '../types/api_object_types';
import { infoBox } from "../types/page_specific/types_RepresentativesPage";
import {RepresentativesPageContentTree} from "../types/page_specific/types_RepresentativesPage";

const baseTextField: Omit<ContentText, "text" | "id" | "name"> = {
    attributes: {},
    detailUrl: "https://f.kth.se/api/content_objects/1",
    dbType: "text"
}

const defaultText: ContentText = {
    dbType: "text",
    id: 1,
    detailUrl: "https://f.kth.se/api/content_objects/1",
    text: "NoTextGiven",
    attributes: {},
    name: "titleRepPage"
}

const infoBox: infoBox  ={
    detailUrl: "", id: 0,
    items: {
        text: {
            ...baseTextField,
            id: 1,
            text: "ne",
            name: "titleRepPage"
        },
        title: {
            ...baseTextField,
            id: 2,
            text: "infoText",
            name: "infoText"
        }
        },
    name: "",
    attributes: {},
    dbType: "dict"


}

const representativesResponse: APIResponse<Page> = {
    code: 200,
    data: {
        id: 1,
        detailUrl: '',
        name: '',
        slug: '',
        pageType: 'styret',
        parent: {
            id: 1,
            detailUrl: '',
            name: ''
        },
        children: [],
        published: true,
        publishedAt: '',
        lastEditedAt: '',
        contentSv: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'root',
            dbType: 'dict',
            attributes: {},
            items: {
                infoBox: infoBox
            }
        },
        contentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'root',
            dbType: 'dict',
            attributes: {},
            items: {

            }
        }
    }
};
