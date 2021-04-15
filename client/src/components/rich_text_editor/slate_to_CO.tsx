import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { jsx } from 'slate-hyperscript';
import { Descendant, Text } from 'slate';
import { Element as ElementUI, Leaf as LeafUI } from './editor_UI';
import { CustomText } from './slate_types';

export const serialize = (nodes: Descendant[]) => {
    return nodes.map((node: Descendant) => {
        if (Text.isText(node)) {
            const element = LeafUI({
                attributes: {},
                children: <>{node.text}</>,
                leaf: node
            });

            return ReactDOMServer.renderToStaticMarkup(element).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        } else {
            const children = serialize(node.children);

            const element = ElementUI({
                attributes: {},
                children: <>{children}</>,
                element: node
            });
            return ReactDOMServer.renderToStaticMarkup(element).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
    }).join('');
};

function deserializeMarks(element: Node): CustomText {
    let text = {
        text: ''
    } as CustomText;

    const children = element.childNodes;
    if (children.length === 1) {
        text = deserializeMarks(element.childNodes[0]);
    }

    switch (element.nodeName) {
    case 'CODE':
        text.code = true;
        break;
    case 'U':
        text.underline = true;
        break;
    case 'I':
        text.italic = true;
        break;
    case 'STRONG':
        text.bold = true;
        break;
    default:
        text.text = element.textContent !== null ? element.textContent : '';
    }

    return text;
}

function deserializeBlocks(element: Node): null | string | Descendant | Descendant[] {
    if (element.nodeType === 3) {
        return deserializeMarks(element);
    } else if (element.nodeType !== 1) {
        return null;
    }

    let children = Array.from(element.childNodes).map(deserializeBlocks);

    if (children.length === 0) {
        children = [{ text: '' }];
    }

    switch (element.nodeName) {
    case 'BODY':
        return jsx('fragment', {}, children);
    case 'BR':
        return '\n';
    case 'UL':
        return jsx('element', { type: 'bulleted-list' }, children);
    case 'OL':
        return jsx('element', { type: 'numbered-list' }, children);
    case 'LI':
        return jsx('element', { type: 'list-item' }, children);
    case 'H1':
        return jsx('element', { type: 'h1' }, children);
    case 'H2':
        return jsx('element', { type: 'h2' }, children);
    case 'H3':
        return jsx('element', { type: 'h3' }, children);
    case 'H4':
        return jsx('element', { type: 'h4' }, children);
    case 'H5':
        return jsx('element', { type: 'h5' }, children);
    case 'P':
        return jsx('element', { type: 'paragraph' }, children);
    default:
        return deserializeMarks(element);
    }
}

export function deserialize(stringRep: string): Descendant[] {
    const document = new DOMParser().parseFromString(stringRep, 'text/html');
    const ret = deserializeBlocks(document.body);
    return ret as Descendant[];
}
