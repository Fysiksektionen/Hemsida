import { NamndPageCT } from '../../types/content_object_trees';
import fcom from '../../mediafiles/placeholder_images/Fcom-ikoner.png';

export const fcomPage = {
    id: 4,
    detailUrl: 'https://f.kth.se/api/pages/2/',
    name: 'Nämndsida - Fcom',
    slug: 'fcom',
    pageType: 'namnd',
    parent: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/pages/2/',
        name: 'Startsidan'
    },
    children: [],
    published: true,
    publishedAt: '2021-03-15',
    lastEditedAt: '2021-03-15',
    contentSv: {
        id: 1,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        dbType: 'dict',
        attributes: {},
        items: {
            title: {
                id: 2,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'text',
                attributes: {},
                text: 'Fcom'
            },
            content: {
                id: 3,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 4,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'image',
                        attributes: {
                            alignment: 'center',
                            width: '100%'
                        },
                        image: {
                            id: 1,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            href: fcom
                        }
                    },
                    {
                        id: 5,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'text',
                        attributes: {
                            size: 3
                        },
                        text: 'Om Kommunikationsnämnden Fcom'
                    },
                    {
                        id: 6,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'text',
                        attributes: {
                            isHTML: true
                        },
                        text: 'Fysiksektionens Kommunikationsnämnd, även kallad <b>Fcom</b>, arbetar med att stödja' +
                            ' sektionen inom allt som är kommunikationsrelaterat. Vår huvuduppgift är att' +
                            ' upprätthålla sektionens kommunikationskanaler, och se till att dessa används på rätt' +
                            ' sätt. Dessutom är vi ansvariga för att utveckla sektionens IT-resurser, producera och' +
                            ' publicera sektionstidningen Force, och ta fram och sälja profilsaker. Vi hjälper också' +
                            ' gärna till med diverse kommunikationsrelaterade saker, så som grafisk design,' +
                            ' fotografi, och mejlutskick. Hör gärna av dig till kommunikationsnämnden på' +
                            ' kommunikation@f.kth.se om du eller din nämnd vill ha hjälp med någonting.'
                    },
                    {
                        id: 7,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'text',
                        attributes: {
                            size: 3
                        },
                        text: 'Engagera dig'
                    },
                    {
                        id: 8,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'text',
                        attributes: {
                            isHTML: true
                        },
                        text: 'Har du varit <b>intresserad</b> av att engagera dig i Fysiksektionen, men känt att tiden' +
                            ' inte riktigt räcker till? Då erbjuder Fcom ett ypperligt tillfälle att prova på att' +
                            ' vara sektionsaktiv utan att binda sig vid något ansvar. Du behöver inte ha några' +
                            ' förkunskaper för att gå med, så länge du är intresserad av att lära dig! Som medlem i' +
                            ' Fcom finns det en otrolig variation bland sakerna du kan göra, från foto och design' +
                            ' till skrivande och programmering. Dessutom är du alltid välkommen att delta på' +
                            ' nämndens möten, och att vara med i någon av nämndens undergrupper; Force-redaktionen' +
                            ' och programmeringsgruppen F.dev. Fyll i detta formulär om du vill gå med i Fcom!'
                    }
                ]
            }
        }
    } as NamndPageCT,
    contentEn: {
        id: 21,
        detailUrl: 'https://f.kth.se/api/content_objects/1/',
        dbType: 'dict',
        attributes: {},
        items: {
            title: {
                id: 22,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'text',
                attributes: {},
                text: 'Fcom'
            },
            content: {
                id: 23,
                detailUrl: 'https://f.kth.se/api/content_objects/1/',
                dbType: 'list',
                attributes: {},
                items: [
                    {
                        id: 24,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'image',
                        attributes: {
                            alignment: 'center',
                            width: '100%'
                        },
                        image: {
                            id: 1,
                            detailUrl: 'https://f.kth.se/api/content_objects/1/',
                            href: fcom
                        }
                    },
                    {
                        id: 25,
                        detailUrl: 'https://f.kth.se/api/content_objects/1/',
                        dbType: 'text',
                        attributes: {},
                        text: 'Some info'
                    }
                ]
            }
        }
    } as NamndPageCT
};
