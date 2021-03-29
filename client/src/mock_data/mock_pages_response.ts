/**
 * Mock data for https://f.kth.se/api/pages/ and https://f.kth.se/api/pages/id/.
 * Used in App.tsx and admin/pages/Pages.tsx.
 */

import { APIResponse } from '../types/general';
import { Page } from '../types/api_object_types';

export const mockPageResp: APIResponse<Page[]> = {
    code: 200,
    data: [
        {
            id: 1,
            detailUrl: 'https://f.kth.se/api/pages/2/',
            name: 'Startsidan',
            slug: '',
            pageType: 'frontpage',
            parent: {
                id: 1,
                detailUrl: 'https://f.kth.se/api/pages/2/',
                name: 'Startsidan'
            },
            children: [
                {
                    id: 2,
                    detailUrl: 'https://f.kth.se/api/pages/2/',
                    name: 'Styret'
                },
                {
                    id: 3,
                    detailUrl: 'https://f.kth.se/api/pages/3/',
                    name: 'Nyhetsflöde'
                }
            ],
            published: true,
            publishedAt: '2021-03-15',
            lastEditedAt: '2021-03-15',
            contentSv: {
                id: 1,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            },
            contentEn: {
                id: 1,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            }
        },
        {
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
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            },
            contentEn: {
                id: 1,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            }
        },
        {
            id: 3,
            detailUrl: 'https://f.kth.se/api/pages/3/',
            name: 'Nyhetsflöde',
            slug: 'nyheter',
            pageType: 'news_feed',
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
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            },
            contentEn: {
                id: 1,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'root',
                dbType: 'dict',
                attributes: {},
                items: {}
            }
        }
    ]
};
