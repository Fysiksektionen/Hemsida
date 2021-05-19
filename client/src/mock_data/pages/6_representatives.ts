import { newContentDict, Page } from '../../types/api_object_types';
import {
    memberFields,
    RepresentativesPageContentTree,
    sectionFields,
    subSectionFields
} from '../../types/content_objects/content_trees/RepresentativesPageType';
import { mockDict, mockList, mockText } from '../mock_utils';

const inroText = 'Letar du efter någon speciell person att kontakta inom Fysiksektionen? Då har du kommit rätt! Här nedan listar vi alla förtroendevalda inom Fysiksektionen med tillhörande kontaktuppgifter.\n\n' +
    'Vill du få bättre koll på vad de olika funktionärerna gör och ansvarar för? Kolla på sidan om sektionens nämnder. Där hittar du information om de olika grupperna och vad de jobbar med.';

const styrelseSection: newContentDict<sectionFields> =
    mockDict<sectionFields>(
        {
            email: mockText('styrelsen@mejl'),
            name: mockText('Styrelsen'),
            subsections: mockList<newContentDict<subSectionFields>>(
                [
                    mockDict<subSectionFields>({
                        email: undefined,
                        name: undefined,
                        members: mockList<newContentDict<memberFields>>([
                            mockDict<memberFields>({
                                yearCode: mockText('F-20'),
                                role: mockText('Role'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Cool name')
                            }),
                            mockDict<memberFields>({
                                yearCode: mockText('F-19'),
                                role: mockText('Role2'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Other Cool name')
                            })
                        ])
                    })
                ])
        }
    );

const namnFunktionarer: newContentDict<sectionFields> =
    mockDict<sectionFields>(
        {
            name: mockText('Nämndfunktionärer'),
            subsections: mockList<newContentDict<subSectionFields>>(
                [
                    mockDict<subSectionFields>({
                        name: mockText('Aktivitetsnämnden'),
                        email: mockText('aktivitet@kth.se'),
                        members: mockList<newContentDict<memberFields>>([
                            mockDict<memberFields>({
                                yearCode: mockText('F-17'),
                                role: mockText('Ordförande'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Namn1')
                            }),
                            mockDict<memberFields>({
                                yearCode: mockText('F-19'),
                                role: mockText('Role2'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Other Cool name')
                            })
                        ])
                    }),
                    mockDict<subSectionFields>({
                        name: mockText('Fysiklanes stabsledning'),
                        email: mockText('fysikalen@kth.se'),
                        members: mockList<newContentDict<memberFields>>([
                            mockDict<memberFields>({
                                yearCode: mockText('F-17'),
                                role: mockText('Kommisare'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Namn1')
                            }),
                            mockDict<memberFields>({
                                yearCode: mockText('F-19'),
                                role: mockText('Kassör'),
                                email: mockText('emailtothisperson@email'),
                                name: mockText('Other Cool name')
                            })
                        ])
                    })
                ])
        });

const contentSv: RepresentativesPageContentTree = {
    id: 1,
    dbType: 'dict',
    attributes: {},
    items: {
        header: mockText('Förtroendevalda'),
        introText: mockText(inroText),
        sections: mockList<newContentDict<sectionFields>>([styrelseSection, namnFunktionarer])
    }
};

export const representativesPage: Page = {

    id: 1,
    detailUrl: '',
    name: '',
    slug: '',
    pageType: 'representatives',
    parent: {
        id: 1,
        detailUrl: '',
        name: ''
    },
    children: [],
    published: true,
    publishedAt: '',
    lastEditedAt: '',
    contentSv: contentSv,
    contentEn: contentSv

};
