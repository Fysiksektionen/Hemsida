// @refresh reset
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { createEditor, Descendant } from 'slate';
import { Editable, withReact, Slate } from 'slate-react';
import { withHistory } from 'slate-history';

import { toggleMark } from './block_mark_utils';
import { Leaf, Element, ToolbarRow } from './editor_UI';
import { SlateMarkType, SlateBlockType, HOTKEYS } from './slate_types';
import { RichTextBlock } from '../../../../types/content_objects/blocks';
import { deserialize, serialize } from './slate_to_CO';
import { Col, Row } from 'react-bootstrap';
import { ContentTreeContext } from '../../../../contexts';

type RichTextEditorProps = {
    content: RichTextBlock,
    markActions: SlateMarkType[],
    blockActions: SlateBlockType[],
    singleLine?: boolean
}

export default function RichTextCOE(props: RichTextEditorProps) {
    const [value, setValue] = useState<Descendant[]>(deserialize(props.content.text));
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [showToolbar, setShowToolbar] = useState(false);

    const dispatch = useContext(ContentTreeContext);

    function updateContent() {
        dispatch({
            id: props.content.id,
            value: {
                ...props.content,
                text: serialize(value)
            }
        });
    }

    useEffect(() => {
        setValue(deserialize(props.content.text));
    }, [props.content.text]);

    const hasActions = props.markActions.length !== 0 || props.blockActions.length !== 0;

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Col>

                { hasActions && <ToolbarRow show={showToolbar} markActions={props.markActions} blockActions={props.blockActions} /> }
                <Row>
                    <Editable
                        className='w-100'
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (Object.prototype.hasOwnProperty.call(HOTKEYS, hotkey)) {
                                    if (isHotkey(hotkey, event as any)) {
                                        event.preventDefault();
                                        const mark = HOTKEYS[hotkey] as SlateMarkType;
                                        if (mark !== undefined && props.markActions.includes(mark)) {
                                            toggleMark(editor, mark);
                                        }
                                    }
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
