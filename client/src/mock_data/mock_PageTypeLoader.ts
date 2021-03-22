/**
 * Mock data for pages/PageTypeLoader.tsx
 */
import { APIResponse } from '../types/api_responses';
import { Page } from '../types/api_object_types';

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
    contentSv: {},
    contentEn: {}
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
        contentSv: {},
        contentEn: {}
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
        contentSv: {},
        contentEn: {}
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
        contentSv: {},
        contentEn: {}
    }
};

export const emptyResp: APIResponse<Page> = {
    code: 200,
    data: {
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
        contentSv: {},
        contentEn: {}
    }
};

export const pathToResp: { [key: string]: APIResponse<Page> } = {
    '/styret': styretPageResp,
    '/newsarticle': newsarticleResp,
    '/nyheter': newsfeedResp
};
