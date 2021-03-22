/**
 * Mock data for pages/PageTypeLoader.tsx
 */
import { APIResponse } from '../types/api_responses';
import { Page } from '../types/api_object_types';

const emptyPage: Page = {
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

const styretPage = emptyPage;
styretPage.pageType = 'styret';
const styretPageResp: APIResponse<Page> = {
    code: 200,
    data: styretPage
};

const newsarticlePage = emptyPage;
newsarticlePage.pageType = 'news_article';
const newsarticleResp: APIResponse<Page> = {
    code: 200,
    data: newsarticlePage
};

const newsfeedPage = emptyPage;
newsfeedPage.pageType = 'news_feed';
const newsfeedResp: APIResponse<Page> = {
    code: 200,
    data: newsfeedPage
};

export const emptyResp: APIResponse<Page> = {
    code: 200,
    data: emptyPage
};

export const pathToResp: { [key: string]: APIResponse<Page> } = {
    '/styret': styretPageResp,
    '/newsarticle': newsarticleResp,
    '/news_feed': newsfeedResp
};
