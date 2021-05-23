import { FrontPageCT, FrontPageItems, OrangeInfoBoxCT } from '../../types/content_objects/content_trees/pages';
import ericsson from '../../mediafiles/placeholder_images/ERI_vertical_RGB.png';
import { Page } from '../../types/api_object_types';
import { mockDict, mockImage, mockList, mockRichText, mockText } from '../mock_utils';
import { HeadingBlock } from '../../types/content_objects/blocks';

const contentSv: FrontPageCT = mockDict<FrontPageItems>(
    {
        orangeBoxes: mockList<OrangeInfoBoxCT>(
            [
                mockDict<OrangeInfoBoxCT['items'], OrangeInfoBoxCT['attributes']>(
                    {
                        title: mockRichText('<p><span>Vill du hitta på något?</span></p>', 'heading', 'none'),
                        text: mockRichText('', 'bodyText', 'only-marks'),
                        button: mockText('Engagera dig')
                    },
                    {
                        color: '#ff642b'
                    }
                ),
                mockDict<OrangeInfoBoxCT['items'], OrangeInfoBoxCT['attributes']>(
                    {
                        title: mockRichText('<p><span>Vill du hitta på något?</span></p>', 'heading', 'none'),
                        text: mockRichText('', 'bodyText', 'only-marks'),
                        button: mockText('Engagera dig')
                    },
                    {
                        color: '#ff642b'
                    }
                ),
                mockDict<OrangeInfoBoxCT['items'], OrangeInfoBoxCT['attributes']>(
                    {
                        title: mockRichText('<p><span>Vill du hitta på något?</span></p>', 'heading', 'none'),
                        text: mockRichText('', 'bodyText', 'only-marks'),
                        button: mockText('Engagera dig')
                    },
                    {
                        color: '#ff642b'
                    }
                )
            ],
            {}
        ),
        sponsorLogo: mockImage(ericsson)
    },
    {}
);

export const frontpage: Page = {
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
    children: [],
    published: true,
    publishedAt: '2021-03-15',
    lastEditedAt: '2021-03-15',
    contentSv: contentSv,
    contentEn: {
        id: 21,
        dbType: 'dict',
        attributes: {},
        items: {
            orangeBoxes: {
                id: 22,
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 23,
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 24,
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>Want to do something?</span></p>'
                            },
                            text: {
                                id: 25,
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
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/engagera-dig/' },
                                text: 'Get involved'
                            }
                        }
                    },
                    {
                        id: 27,
                        dbType: 'dict',
                        attributes: { color: '#dc3545' },
                        items: {
                            title: {
                                id: 28,
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>What is the Physics Chapter?</span></p>'
                            },
                            text: {
                                id: 29,
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
                                dbType: 'text',
                                attributes: { link: 'https://f.kth.se/fysiksektionen/' },
                                text: 'About the chapter'
                            }
                        }
                    },
                    {
                        id: 31,
                        dbType: 'dict',
                        attributes: { color: '#ff642b' },
                        items: {
                            title: {
                                id: 32,
                                dbType: 'text',
                                attributes: {
                                    blockType: 'heading',
                                    richTextEditorType: 'none'
                                },
                                text: '<p><span>What\'s up next?</span></p>'
                            },
                            text: {
                                id: 33,
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
                dbType: 'image',
                attributes: {},
                image: {
                    id: 1,
                    href: ericsson
                }
            }
        }
    } as FrontPageCT
};
