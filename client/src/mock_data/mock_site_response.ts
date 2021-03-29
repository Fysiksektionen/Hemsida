/**
 * Mock data for https://f.kth.se/api/site. Used in App.tsx and admin/settings/Settings.tsx.
 */

import fysikLogo from '../Fysiksektionen_logo.svg';
import { APIResponse } from '../types/general';
import { Site } from '../types/api_object_types';

export const mockSiteResp: APIResponse<Site> = {
    code: 200,
    data: {
        rootUrl: 'https://f.kth.se/',
        rootPage: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/pages/1/',
            name: 'Hem'
        },
        headerContentSv: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                name: {
                    id: 2,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'name',
                    dbType: 'text',
                    attributes: {},
                    text: 'Fysiksektionen'
                },
                logo: {
                    id: 3,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'logo',
                    dbType: 'image',
                    attributes: {},
                    image: {
                        id: 1,
                        detailUrl: 'https://f.kth.se/api/images/1/',
                        href: fysikLogo
                    }
                }
            }
        },
        headerContentEn: {
            id: 4,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                name: {
                    id: 5,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'name',
                    dbType: 'text',
                    attributes: {},
                    text: 'The Physics Chapter'
                },
                logo: {
                    id: 6,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'logo',
                    dbType: 'image',
                    attributes: {},
                    image: {
                        id: 1,
                        detailUrl: 'https://f.kth.se/api/images/1/',
                        href: fysikLogo
                    }
                }
            }
        },
        footerContentSv: {
            id: 7,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 8,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'webmaster',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 9,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'currYear',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 10,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'address',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm'
                }
            }
        },
        footerContentEn: {
            id: 11,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            name: 'headerContent',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 12,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'webmaster',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 13,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'currYear',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 14,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    name: 'address',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm, Sweden'
                }
            }
        }
    }
};
