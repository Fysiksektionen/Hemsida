import { RichTextBlock } from '../../../types/content_objects/blocks';
import { Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';

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
    const [showEditor, setShowEditor] = useState(false);

    return (
        <div>
            {!edit || !showEditor
                ? <div>
                    {parse(text)}
                </div>
                : <div>
                    Insert editor!
                </div>
            }
        </div>
    );
}
