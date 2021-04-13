import { RichTextBlock } from '../../../types/content_objects/blocks';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';
import RichTextExample from './RichEditor/richtext';

export default function RichTextCOR({ content }: {content: RichTextBlock}) {
    const [text, setInternalText] = useState(content.text);
    useEffect(() => {
        setInternalText(content.text);
    }, [content.text]);

    const dispatch = useContext(ContentTreeContext);

    function updateContentValue() {
        dispatch({ id: content.id, value: { ...content, text: text } });
    }

    const edit = useContext(EditorialModeContext);
    const [showEditor, setShowEditor] = useState(true);

    return (
        <div>
            {!edit || !showEditor
                ? <div>
                    {parse(text)}
                </div>
                : <div>
                    <RichTextExample content={content} />
                </div>
            }
        </div>
    );
}
