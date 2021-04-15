import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { createEditor, Descendant } from 'slate';
import { Editable, withReact, Slate } from 'slate-react';
import { withHistory } from 'slate-history';

import { toggleMark } from './block_mark_utils';
import { Leaf, Element, ToolbarRow } from './editor_UI';
import { MarkTypes, BlockTypes, HOTKEYS } from './slate_types';
import { RichTextBlock } from '../../types/content_objects/blocks';
import { deserialize, serialize } from './slate_to_CO';
import { Col, Row } from 'react-bootstrap';

type RichTextEditorProps = {
    content: RichTextBlock,
    onDoneEdit: (block: RichTextBlock) => void,
    markActions: MarkTypes[],
    blockActions: BlockTypes[],
    singleLine?: boolean
}

export default function RichTextEditor(props: RichTextEditorProps) {
    const [value, setValue] = useState<Descendant[]>(deserialize(props.content.text));
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
            <Col>
                <ToolbarRow show={showToolbar} markActions={props.markActions} blockActions={props.blockActions} />
                <Row>
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
                </Row>
            </Col>
        </Slate>
    );
};
