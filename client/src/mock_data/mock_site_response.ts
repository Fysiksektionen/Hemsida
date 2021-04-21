/**
 * Mock data for https://f.kth.se/api/site. Used in App.tsx and admin/settings/Settings.tsx.
 */

import fysikLogo from '../mediafiles/placeholder_images/Fysiksektionen_logo.svg';
import { APIResponse } from '../types/general';
import { Site } from '../types/api_object_types';
import { headerMidMenuEn, headerMidMenuSv, mainMenuEn, mainMenuSv } from './mock_menus';

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
            dbType: 'dict',
            attributes: {},
            items: {
                logo: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'image',
                    attributes: {},
                    image: {
                        id: 1,
                        detailUrl: 'https://f.kth.se/api/images/1/',
                        href: fysikLogo
                    }
                },
                midMenu: {
                    id: 2,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'menu',
                    attributes: {},
                    menu: headerMidMenuSv
                },
                mainMenu: {
                    id: 3,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'menu',
                    attributes: {},
                    menu: mainMenuSv
                }
            }
        },
        headerContentEn: {
            id: 4,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            dbType: 'dict',
            attributes: {},
            items: {
                logo: {
                    id: 4,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'image',
                    attributes: {},
                    image: {
                        id: 1,
                        detailUrl: 'https://f.kth.se/api/images/1/',
                        href: fysikLogo
                    }
                },
                midMenu: {
                    id: 5,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'menu',
                    attributes: {},
                    menu: headerMidMenuEn
                },
                mainMenu: {
                    id: 6,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'menu',
                    attributes: {},
                    menu: mainMenuEn
                }
            }
        },
        footerContentSv: {
            id: 7,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 8,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 9,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 10,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm'
                }
            }
        },
        footerContentEn: {
            id: 11,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            dbType: 'dict',
            attributes: {},
            items: {
                webmaster: {
                    id: 12,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Christoffer Ejemyr'
                },
                currYear: {
                    id: 13,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: '2021'
                },
                address: {
                    id: 14,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm, Sweden'
                }
            }
        }
    }
};
