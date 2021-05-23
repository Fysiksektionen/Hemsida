import {
    ContentImage,
    ContentObject,
    ContentText,
    newContentDict,
    newContentList
} from '../types/api_object_types';
import { RichTextBlock, RichTextBlockType, RichTextEditorTypes } from '../types/content_objects/blocks';

function mockIdGenerator(): () => number {
    let idCounter = 0;
    return () => {
        idCounter++;
        return idCounter;
    };
}

const getMockId = mockIdGenerator();

export function mockText(text: string, attributes?: object, id?: number): ContentText {
    return {
        id: id || getMockId(),
        dbType: 'text',
        attributes: attributes || {},
        text: text
    };
}

export function mockRichText(text: string, blockType: RichTextBlockType, richTextEditorType: RichTextEditorTypes, id?: number): RichTextBlock {
    return {
        id: id || getMockId(),
        dbType: 'text',
        attributes: {
            blockType: blockType,
            richTextEditorType: richTextEditorType
        },
        text: text
    };
}

export function mockImage(imageHref: string, attributes?: object, id?: number): ContentImage {
    return {
        id: id || getMockId(),
        dbType: 'image',
        attributes: attributes || {},
        image: {
            id: getMockId(),
            detailUrl: '',
            href: imageHref
        }
    };
}

export function mockDict<T extends NodeJS.Dict<ContentObject>, A = {}>(items: T, attributes: A, id?: number): newContentDict<T, A> {
    return {
        id: id || getMockId(),
        dbType: 'dict',
        attributes: attributes,
        items: items
    };
}

export function mockList<T extends ContentObject, A = {}>(items: T[], attributes: A, id?: number): newContentList<T, A> {
    return {
        id: id || getMockId(),
        dbType: 'list',
        attributes: attributes,
        items: items
    };
}
