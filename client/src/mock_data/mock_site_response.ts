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
                address: {
                    id: 10,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm'
                },
                quickAccess: {
                    id: 11,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'list',
                    attributes: {},
                    items: [
                        {
                            id: 12,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 13,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Kontakt</span></p>'
                                },
                                info: {
                                    id: 14,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span><strong>Ordförande<br/>' +
                                        '</strong></span><span>Morris Eriksson<br/>' +
                                        '073 – 385 48 66<br/>' +
                                        'ordf@f.kth.se</span></p><p><span><strong>Postadress<br/>' +
                                        '</strong></span><span>Fysiksektionen, THS<br/>' +
                                        '100 44 Stockholm</span></p><p><span><strong>Organisationsnummer</strong></span><span><br/>' +
                                        '802411-8948</span></p>'
                                }
                            }
                        },
                        {
                            id: 15,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 16,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Hitta snabbt</span></p>'
                                },
                                info: {
                                    id: 17,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Kontakta' +
                                        ' oss</span></p><p><span>Möteshandlingar</span></p><p><span>Bli' +
                                        ' kårmedlem</span></p><p><span>Annonsera</span></p>'
                                }
                            }
                        },
                        {
                            id: 18,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 19,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Studiesocialt</span></p>'
                                },
                                info: {
                                    id: 20,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Klubbmästeriet fkm*</span></p><p><span>Övriga frågor</span></p>'
                                }
                            }
                        },
                        {
                            id: 21,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 22,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Utbildning</span></p>'
                                },
                                info: {
                                    id: 23,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Studienämnden</span></p>'
                                }
                            }
                        }
                    ]
                }
            }
        },
        footerContentEn: {
            id: 24,
            detailUrl: 'https://f.kth.se/api/content_objects/1/',
            dbType: 'dict',
            attributes: {},
            items: {
                address: {
                    id: 25,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'text',
                    attributes: {},
                    text: 'Brinellvägen 89, 114 28 Stockholm, Sweden'
                },
                quickAccess: {
                    id: 26,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    dbType: 'list',
                    attributes: {},
                    items: [
                        {
                            id: 27,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 28,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Contact</span></p>'
                                },
                                info: {
                                    id: 29,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span><strong>President<br/>' +
                                        '</strong></span><span>Morris Eriksson<br/>' +
                                        '073 – 385 48 66<br/>' +
                                        'ordf@f.kth.se</span></p><p><span><strong>Postal address<br/>' +
                                        '</strong></span><span>Fysiksektionen, THS<br/>' +
                                        '100 44' +
                                        ' Stockholm</span></p><p><span><strong>Organisation' +
                                        ' number</strong></span><span><br/>' +
                                        '802411-8948</span></p>'
                                }
                            }
                        },
                        {
                            id: 30,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 31,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Shortcuts</span></p>'
                                },
                                info: {
                                    id: 32,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Contact' +
                                        ' us</span></p><p><span>Meating' +
                                        ' documents</span></p><p><span>Join THS</span></p><p><span>Market</span></p>'
                                }
                            }
                        },
                        {
                            id: 33,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 34,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Social</span></p>'
                                },
                                info: {
                                    id: 35,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Event committee, fkm*</span></p><p><span>Other social' +
                                        ' issues</span></p>'
                                }
                            }
                        },
                        {
                            id: 36,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            dbType: 'dict',
                            attributes: {},
                            items: {
                                header: {
                                    id: 37,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'none' },
                                    text: '<p><span>Education</span></p>'
                                },
                                info: {
                                    id: 38,
                                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                    dbType: 'text',
                                    attributes: { blockType: 'bodyText', richTextEditorType: 'body-text' },
                                    text: '<p><span>Education committee</span></p>'
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
};
