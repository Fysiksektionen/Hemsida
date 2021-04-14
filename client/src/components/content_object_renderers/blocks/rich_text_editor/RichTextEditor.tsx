import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';

import { toggleMark } from './block_mark_utils';
import { BlockButton, Leaf, MarkButton, Element, Toolbar } from './editor_UI';
import { MarkTypes, BlockTypes, HOTKEYS } from './custom_types';
import { HeaderBlock, RichTextBlock } from '../../../../types/content_objects/blocks';
import { deserialize, serialize } from './slate_to_CO';

const markFormatIconDict: NodeJS.Dict<JSX.Element> = {
    bold: <i className={'fas fa-bold'} />,
    italic: <i className={'fas fa-italic'} />,
    underline: <i className={'fas fa-underline'} />,
    code: <i className={'fas fa-code'} />
};
const blockFormatIconDict: NodeJS.Dict<JSX.Element> = {
    'numbered-list': <i className={'fas fa-list-ol'} />,
    'bulleted-list': <i className={'fas fa-list-ul'} />,
    h1: <><i className={'fas fa-heading'} />1</>,
    h2: <><i className={'fas fa-heading'} />2</>,
    h3: <><i className={'fas fa-heading'} />3</>,
    h4: <><i className={'fas fa-heading'} />4</>,
    h5: <><i className={'fas fa-heading'} />5</>
};

type RichTextEditorProps = {
    content: RichTextBlock | HeaderBlock,
    onDoneEdit: (text: RichTextBlock | HeaderBlock) => void,
    markActions?: MarkTypes[],
    blockActions?: BlockTypes[],
    singleLine?: boolean
}

export default function RichTextEditor(props: RichTextEditorProps) {
    const contentDeserialized = deserialize(props.content.text);

    const [value, setValue] = useState<Descendant[]>(contentDeserialized);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [showToolbar, setShowToolbar] = useState(false);

    useEffect(() => {
        setValue(deserialize(props.content.text));
    }, [props.content]);

    function updateContent() {
        const newContent = { ...props.content, text: serialize(value) };
        props.onDoneEdit(newContent);
    }

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <div className={'w-100' + (!showToolbar ? ' d-none' : '')} onMouseDown={(event) => event.preventDefault()}>
                <Toolbar>
                    {props.markActions && props.markActions.map((markFormat, index) => {
                        return <MarkButton format={markFormat} icon={markFormatIconDict[markFormat]} key={index}/>;
                    })}
                    {
                        ((props.markActions && props.markActions.length !== 0) && (props.blockActions && props.blockActions.length !== 0)) &&
                        <span style={{ color: '#ccc' }}>|</span>
                    }
                    {props.blockActions && props.blockActions.map((blockFormat, index) => {
                        return <BlockButton format={blockFormat} icon={blockFormatIconDict[blockFormat]} key={index}/>;
                    })}
                </Toolbar>
            </div>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey] as string;
                            toggleMark(editor, mark);
                        }
                    }
                    if (props.singleLine && event.key === 'Enter') {
                        event.preventDefault();
                    }
                }}
                onFocus={() => {
                    setShowToolbar(true);
                }}
                onBlur={() => {
                    if (showToolbar) {
                        updateContent();
                    }
                    setShowToolbar(false);
                }}
            />
        </Slate>
    );
};

RichTextEditor.defaultProps = {
    content: {
        id: 0,
        detailUrl: '',
        dbType: 'text',
        attributes: {
            blockType: 'richText'
        },
        text: ''
    } as RichTextBlock,
    onDoneEdit: () => {},
    markActions: ['bold', 'italic', 'underline', 'code'] as MarkTypes[],
    blockActions: ['bulleted-list', 'numbered-list', 'h1', 'h2', 'h3', 'h4', 'h5'] as BlockTypes[],
    singleLine: false
};
