import { Page } from '../types/api_object_types';
import { RepresentativesPageContentTree, infoBox } from '../types/page_specific/types_RepresentativesPage';

const contentSv: RepresentativesPageContentTree = {
    id: 1,
    detailUrl: 'https://f.kth.se/api/content_objects/1',
    dbType: 'dict',
    attributes: {},
    items: {
        infoBox: {
            id: 2,
            attributes: {},
            detailUrl: '',
            dbType: 'dict',
            items: {
                text: {
                    id: 3,
                    attributes: {},
                    dbType: 'text',
                    detailUrl: '',
                    text: 'Text'
                },
                title: {
                    id: 4,
                    attributes: {},
                    dbType: 'text',
                    detailUrl: '',
                    text: 'Representatives!'
                }
            }
        }
    }
};

export const representativesPage: Page = {

    id: 1,
    detailUrl: '',
    name: '',
    slug: '',
    pageType: 'representatives',
    parent: {
        id: 1,
        detailUrl: '',
        name: ''
    },
    children: [],
    published: true,
    publishedAt: '',
    lastEditedAt: '',
    contentSv: contentSv,
    contentEn: contentSv

};
