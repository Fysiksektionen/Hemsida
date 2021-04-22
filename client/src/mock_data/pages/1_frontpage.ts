import { FrontPageCT } from '../../types/content_objects/content_trees/pages';
import ericsson from '../../mediafiles/placeholder_images/ERI_vertical_RGB.png';

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
        dbType: 'dict',
        attributes: {},
        items: {
            orangeBoxes: {
                id: 2,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 3,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 4,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>Vill du hitta på något?</span></p>'
                            },
                            text: {
                                id: 13,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>Vill du vara med och ta emot de som börjar till ' +
                                    'hösten? Vill du anordna en fest? Vill du gå på en fest? ' +
                                    'Vill du förbättra utbildningen? Vill du jobba på dina ' +
                                    'företagskontakter? Vill du bara hänga med andra som ' +
                                    'pluggar fysik och matte? På Fysiksektionen finns det ' +
                                    'mängder med sätt att vara med och engagera sig. </span><span><strong>Läs ' +
                                    'mer om hur du kan vara med genom att följa länken.</strong></span></p>'
                            },
                            button: {
                                id: 5,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/engagera-dig/' },
                                text: 'Engagera dig'
                            }
                        }
                    },
                    {
                        id: 8,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#dc3545' },
                        items: {
                            title: {
                                id: 9,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>Vad är Fysiksektionen?</span></p>'
                            },
                            text: {
                                id: 10,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>Fysiksektionen är en organisation som hittar på roliga, ' +
                                    'nyttiga, annorlunda, och viktiga saker för alla de som ' +
                                    'studerar Teknisk fysik och Teknisk matematik vid KTH. ' +
                                    'Målet är att det ska finnas mer än något för alla som vill ' +
                                    'ha mer än något. </span><span><strong>Vill du veta mer om Fysiksektionen? ' +
                                    'Följ då länken nedan.</strong></span></p>'
                            },
                            button: {
                                id: 11,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/fysiksektionen/' },
                                text: '0m sektionen'
                            }
                        }
                    },
                    {
                        id: 14,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 15,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>Vad händer nu?</span></p>'
                            },
                            text: {
                                id: 16,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>På Fysiksektionen är det hela tiden saker på gång. Vi har ' +
                                    'fester titt som tätt, det hålls bokcirklar, en ' +
                                    'arbetsmarknadsdag anordnas, ett spex sätts ihop, Åre ' +
                                    'besöks, de nyantagna tas emot och även om det inte är ' +
                                    'något annat så kan du räkna med att det är en pub i ' +
                                    'Konsultatet varje tisdag. </span><span><strong>Vill du veta mer om vilka ' +
                                    'evenemang som är på gång just nu? Följ länken nedan.</strong></span></p>'
                            },
                            button: {
                                id: 17,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
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
                dbType: 'image',
                attributes: {},
                image: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    href: ericsson
                }
            }
        }
    } as FrontPageCT,
    contentEn: {
        id: 21,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        dbType: 'dict',
        attributes: {},
        items: {
            orangeBoxes: {
                id: 22,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 23,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 24,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>Want to do something?</span></p>'
                            },
                            text: {
                                id: 25,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>Do you want to join and receive those who start to ' +
                                    'autumn? Do you want to organize a party? Do you want to go to a party? ' +
                                    'Do you want to improve education? Do you want to work on your ' +
                                    'business contacts? Do you just want to hang out with others like ' +
                                    'study physics and math? In the Physics section there is' +
                                    'lots of ways to get involved and get involved. </span><span><strong>Read ' +
                                    'more about how to join by following the link.</strong></span></p>'
                            },
                            button: {
                                id: 26,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/engagera-dig/' },
                                text: 'Get involved'
                            }
                        }
                    },
                    {
                        id: 27,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#dc3545' },
                        items: {
                            title: {
                                id: 28,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>What is the Physics Chapter?</span></p>'
                            },
                            text: {
                                id: 29,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>The Physics Chapter is an organization that invents fun, ' +
                                    'useful, different, and important things for all those who' +
                                    'studies Technical Physics and Technical Mathematics at KTH. ' +
                                    'The goal is that there should be more than something for everyone who wants' +
                                    'have more than anything. </span><span><strong>Want to know more about the Physics Chapter? ' +
                                    'Then follow the link below.</strong></span></p>'
                            },
                            button: {
                                id: 30,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/fysiksektionen/' },
                                text: 'About the chapter'
                            }
                        }
                    },
                    {
                        id: 31,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 32,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>What\'s up next?</span></p>'
                            },
                            text: {
                                id: 33,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: {
                                    blockType: 'bodyText',
                                    richTextEditorType: 'only-marks'
                                },
                                text: '<p><span>At the Physics Chapter, things are always going on. We have ' +
                                    'parties look like tight, book circles are held, a' +
                                    'labor market day is arranged, a spex is put together, Åre' +
                                    'visited, the newly admitted are received and even if it is not' +
                                    'something else, you can count on it being a pub in' +
                                    'The consultation every Tuesday. </span><span><strong>Want to know more about which ' +
                                    'events going on right now? Follow the link below.</strong></span></p>'
                            },
                            button: {
                                id: 34,
                                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/event/' },
                                text: 'Events'
                            }
                        }
                    }
                ]
            },
            sponsorLogo: {
                id: 35,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'image',
                attributes: {},
                image: {
                    id: 1,
                    detailUrl: 'https://f.kth.se/api/content_objects/1/',
                    href: ericsson
                }
            }
        }
    } as FrontPageCT
};
