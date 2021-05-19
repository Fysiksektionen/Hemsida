import { ContentObject, ContentText, newContentDict, newContentList } from '../types/api_object_types';

function mockIdGenerator(): () => number {
    let idCounter = 0;
    return () => {
        idCounter++;
        return idCounter;
    };
}

const getMockId = mockIdGenerator();

export function mockText(text: string, id?: number): ContentText {
    return {
        id: id || getMockId(),
        dbType: 'text',
        attributes: {},
        text: text
    };
}

export function mockDict<T extends NodeJS.Dict<ContentObject>>(items: T, id?: number): newContentDict<T> {
    return {
        dbType: 'dict',
        id: id || getMockId(),
        attributes: {},
        items: items
    };
}

export function mockList<T extends ContentObject>(items: T[], id?: number): newContentList<T> {
    return {
        attributes: {},
        id: id || getMockId(),
        dbType: 'list',
        items: items
    };
}
