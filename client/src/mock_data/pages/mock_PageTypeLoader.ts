/**
 * Mock data for content_trees/PageTypeLoader.tsx
 */
import { Page } from '../../types/api_object_types';
import { APIResponse } from '../../types/general';
import { frontpage } from './1_frontpage';
import { styret } from './2_styret';
import { newsFeed } from './3_news_feed';
import { newsArticle } from './4_newsarticle';
import { fcomPage } from './5_fcom';

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
        dbType: 'dict',
        attributes: {},
        items: {}
    },
    contentEn: {
        id: 1,
        dbType: 'dict',
        attributes: {},
        items: {}
    }
};

export const emptyResp = { code: 404, data: emptyPage };

export const pathToResp: { [key: string]: APIResponse<Page> } = {
    '/': { code: 200, data: frontpage },
    '/start': { code: 200, data: frontpage },
    '/index': { code: 200, data: frontpage },
    '/hem': { code: 200, data: frontpage },
    '/home': { code: 200, data: frontpage },
    '/styret': { code: 200, data: styret },
    '/nyheter': { code: 200, data: newsFeed },
    '/newsarticle': { code: 200, data: newsArticle },
    '/fcom': { code: 200, data: fcomPage }
};
