/**
 * Mock data for App.tsx
 */

import { SiteResponse } from '../types/api_responses';

export const mockSiteResp: SiteResponse = {
    code: 200,
    data: {
        headerContentSv: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                name: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'name',
                    dbType: 'text',
                    attributes: {},
                    text: 'Fysiksektionen'
                }
            }
        },
        headerContentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                name: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'name',
                    dbType: 'text',
                    attributes: {},
                    text: 'The Physics Chapter'
                }
            }
        },
        footerContentSv: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'webmaster',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'currYear',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'address',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm'
                }
            }
        },
        footerContentEn: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'webmaster',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'currYear',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1',
                    name: 'address',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm'
                }
            }
        }
    }
};
