import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement
} from 'slate';
import { withHistory } from 'slate-history';

// @ts-ignore
import { Button, Icon, Toolbar } from './components';
import { CustomEditor } from './custom-types';
import { RichTextBlock } from '../../../../types/content_objects/blocks';

const HOTKEYS: NodeJS.Dict<string> = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

function RichTextExample({content}: {content: RichTextBlock}) {

    const [value, setValue] = useState<Descendant[]>(initialValue);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Toolbar>
                <MarkButton format="bold" icon="bold"/>
                <MarkButton format="italic" icon="italic"/>
                <MarkButton format="underline" icon="underline"/>
                <MarkButton format="code" icon="code"/>
                <BlockButton format="numbered-list" icon="list-ol"/>
                <BlockButton format="bulleted-list" icon="list-ul"/>
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey] as string;
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

const toggleBlock = (editor: CustomEditor, format: SlateElement['type']) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type).toString()
            ),
        split: true
    });
    const newProperties: Partial<SlateElement> = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        // @ts-ignore
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor: CustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: CustomEditor, format: string) => {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    });

    return !!match;
};

const isMarkActive = (editor: CustomEditor, format: string) => {
    const marks = Editor.marks(editor);
    // @ts-ignore
    return marks ? marks[format] === true : false;
};

// @ts-ignore
const Element = ({ attributes, children, element }) => {
    switch (element.type) {
    case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
        return <li {...attributes}>{children}</li>;
    case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
    default:
        return <p {...attributes}>{children}</p>;
    }
};

// @ts-ignore
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({format, icon}: { format: SlateElement['type'], icon: string }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <i className={'fas fa-' + icon} />
        </Button>
    );
};

const MarkButton = ({format, icon}: { format: string, icon: string }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <i className={'fas fa-' + icon} />
        </Button>
    );
};

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' }
        ]
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
          "Since it's rich text, you can do things like turn a selection of text "
            },
            { text: 'bold', bold: true },
            {
                text:
          ', or add a semantically rendered block quote in the middle of the page, like this:'
            }
        ]
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }]
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }]
    }
];

export default RichTextExample;
