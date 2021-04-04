/**
 * Mock data for pages/PageTypeLoader.tsx
 */
import { Page } from '../types/api_object_types';
import { APIResponse } from '../types/general';

export const emptyPage: Page = {
    id: 1,
    detailUrl: '',
    name: '',
    slug: '',
    pageType: '',
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
        items: {}
    },
    contentEn: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/content_objects/1',
        name: 'root',
        dbType: 'dict',
        attributes: {},
        items: {}
    }
};

const styretPageResp: APIResponse<Page> = {
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
            items: {}
        },
        contentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'root',
            dbType: 'dict',
            attributes: {},
            items: {}
        }
    }
};

const newsarticleResp: APIResponse<Page> = {
    code: 200,
    data: {
        id: 1,
        detailUrl: '',
        name: '',
        slug: '',
        pageType: 'news_article',
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
            items: {}
        },
        contentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'root',
            dbType: 'dict',
            attributes: {},
            items: {}
        }
    }
};

const newsfeedResp: APIResponse<Page> = {
    code: 200,
    data: {
        id: 1,
        detailUrl: '',
        name: '',
        slug: '',
        pageType: 'news_feed',
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
            items: {}
        },
        contentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'root',
            dbType: 'dict',
            attributes: {},
            items: {}
        }
    }
};

export const emptyResp: APIResponse<Page> = {
    code: 200,
    data: emptyPage
};

export const pathToResp: { [key: string]: APIResponse<Page> } = {
    '/styret': styretPageResp,
    '/newsarticle': newsarticleResp,
    '/nyheter': newsfeedResp
};
