import { FrontPageContentTree } from '../../types/content_object_trees';

export const frontpage = {
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
        items: {
            orangeBoxes: {
                id: 2,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'orangeBoxes',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 3,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 4,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vill du hitta på något?'
                            },
                            text: {
                                id: 4,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vill du vara med och ta emot de som börjar till ' +
                                    'hösten? Vill du anordna en fest? Vill du gå på en fest? ' +
                                    'Vill du förbättra utbildningen? Vill du jobba på dina ' +
                                    'företagskontakter? Vill du bara hänga med andra som ' +
                                    'pluggar fysik och matte? På Fysiksektionen finns det ' +
                                    'mängder med sätt att vara med och engagera sig. <b>Läs ' +
                                    'mer om hur du kan vara med genom att följa länken.</b>'
                            },
                            button: {
                                id: 5,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/engagera-dig/' },
                                text: 'Engagera dig'
                            }
                        }
                    },
                    {
                        id: 8,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#dc3545' },
                        items: {
                            title: {
                                id: 9,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'title',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vad är Fysiksektionen?'
                            },
                            text: {
                                id: 10,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'text',
                                dbType: 'text',
                                attributes: {},
                                text: 'Fysiksektionen är en organisation som hittar på roliga, ' +
                                    'nyttiga, annorlunda, och viktiga saker för alla de som ' +
                                    'studerar Teknisk fysik och Teknisk matematik vid KTH. ' +
                                    'Målet är att det ska finnas mer än något för alla som vill ' +
                                    'ha mer än något. <b>Vill du veta mer om Fysiksektionen? ' +
                                    'Följ då länken nedan.</b>'
                            },
                            button: {
                                id: 11,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'button',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/fysiksektionen/' },
                                text: '0m sektionen'
                            }
                        }
                    },
                    {
                        id: 14,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 15,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'title',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vad händer nu?'
                            },
                            text: {
                                id: 16,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'text',
                                dbType: 'text',
                                attributes: {},
                                text: 'På Fysiksektionen är det hela tiden saker på gång. Vi har ' +
                                    'fester titt som tätt, det hålls bokcirklar, en ' +
                                    'arbetsmarknadsdag anordnas, ett spex sätts ihop, Åre ' +
                                    'besöks, de nyantagna tas emot och även om det inte är ' +
                                    'något annat så kan du räkna med att det är en pub i ' +
                                    'Konsultatet varje tisdag. <b>Vill du veta mer om vilka ' +
                                    'evenemang som är på gång just nu? Följ länken nedan.</b>'
                            },
                            button: {
                                id: 17,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'button',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/event/' },
                                text: 'Event'
                            }
                        }
                    }
                ]
            },
            sponsorLogo: {
                id: 20,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'sponsorLogo',
                dbType: 'image',
                attributes: {},
                image: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    href: ''
                }
            }
        }
    } as FrontPageContentTree,
    contentEn: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        name: 'root',
        dbType: 'dict',
        attributes: {},
        items: {
            orangeBoxes: {
                id: 2,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'orangeBoxes',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 3,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 4,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vill du hitta på något?'
                            },
                            text: {
                                id: 4,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vill du vara med och ta emot de som börjar till ' +
                                    'hösten? Vill du anordna en fest? Vill du gå på en fest? ' +
                                    'Vill du förbättra utbildningen? Vill du jobba på dina ' +
                                    'företagskontakter? Vill du bara hänga med andra som ' +
                                    'pluggar fysik och matte? På Fysiksektionen finns det ' +
                                    'mängder med sätt att vara med och engagera sig. <b>Läs ' +
                                    'mer om hur du kan vara med genom att följa länken.</b>'
                            },
                            button: {
                                id: 5,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'root',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/engagera-dig/' },
                                text: 'Engagera dig'
                            }
                        }
                    },
                    {
                        id: 8,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#dc3545' },
                        items: {
                            title: {
                                id: 9,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'title',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vad är Fysiksektionen?'
                            },
                            text: {
                                id: 10,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'text',
                                dbType: 'text',
                                attributes: {},
                                text: 'Fysiksektionen är en organisation som hittar på roliga, ' +
                                    'nyttiga, annorlunda, och viktiga saker för alla de som ' +
                                    'studerar Teknisk fysik och Teknisk matematik vid KTH. ' +
                                    'Målet är att det ska finnas mer än något för alla som vill ' +
                                    'ha mer än något. <b>Vill du veta mer om Fysiksektionen? ' +
                                    'Följ då länken nedan.</b>'
                            },
                            button: {
                                id: 11,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'button',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/fysiksektionen/' },
                                text: '0m sektionen'
                            }
                        }
                    },
                    {
                        id: 14,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        name: 'box',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 15,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'title',
                                dbType: 'text',
                                attributes: {},
                                text: 'Vad händer nu?'
                            },
                            text: {
                                id: 16,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'text',
                                dbType: 'text',
                                attributes: {},
                                text: 'På Fysiksektionen är det hela tiden saker på gång. Vi har ' +
                                    'fester titt som tätt, det hålls bokcirklar, en ' +
                                    'arbetsmarknadsdag anordnas, ett spex sätts ihop, Åre ' +
                                    'besöks, de nyantagna tas emot och även om det inte är ' +
                                    'något annat så kan du räkna med att det är en pub i ' +
                                    'Konsultatet varje tisdag. <b>Vill du veta mer om vilka ' +
                                    'evenemang som är på gång just nu? Följ länken nedan.</b>'
                            },
                            button: {
                                id: 17,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                name: 'button',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/event/' },
                                text: 'Event'
                            }
                        }
                    }
                ]
            },
            sponsorLogo: {
                id: 20,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                name: 'sponsorLogo',
                dbType: 'image',
                attributes: {},
                image: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    href: ''
                }
            }
        }
    } as FrontPageContentTree
};
