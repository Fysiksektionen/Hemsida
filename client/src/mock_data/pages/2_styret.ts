import { ContentObject } from '../../types/api_object_types';

export const styret = {
    id: 2,
    detailUrl: 'https://f.kth.se/api/pages/2/',
    name: 'Styret',
    slug: 'styret',
    pageType: 'styret',
    parent: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/pages/1/',
        name: 'Startsidan'
    },
    children: [],
    published: true,
    publishedAt: '2021-03-15',
    lastEditedAt: '2021-03-15',
    contentSv: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        dbType: 'dict',
        attributes: {},
        items: {}
    } as ContentObject,
    contentEn: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        dbType: 'dict',
        attributes: {},
        items: {}
    } as ContentObject
};
