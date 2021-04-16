import { RichTextBlock } from '../../../types/content_objects/blocks';
import parse from 'html-react-parser';
import React, { useContext } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';
import RichTextEditor from '../../rich_text_editor/RichTextEditor';
import { SlateBlockType, SlateMarkType } from '../../rich_text_editor/slate_types';

const richTextEditorSettings: {[key in RichTextBlock['attributes']['richTextEditorType']]: { marks: SlateMarkType[], blocks: SlateBlockType[], singleLine?: boolean }} = {
    'body-text': {
        marks: ['bold', 'italic', 'underline', 'code'],
        blocks: ['bulleted-list', 'numbered-list']
    },
    'only-headings': {
        marks: [],
        blocks: ['h1', 'h2', 'h3', 'h4', 'h5'],
        singleLine: true
    },
    none: {
        marks: [],
        blocks: [],
        singleLine: true
    },
    all: {
        marks: ['bold', 'italic', 'underline', 'code'],
        blocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'bulleted-list', 'numbered-list'],
        singleLine: true
    }
};

export default function RichTextCOR({ content }: {content: RichTextBlock}) {
    const dispatch = useContext(ContentTreeContext);

    function updateContentValue(block: RichTextBlock) {
        dispatch({ id: content.id, value: block });
    }

    const edit = useContext(EditorialModeContext);
    return (
        <div className='w-100'>
            {!edit
                ? <>{ parse(content.text) }</>
                : <RichTextEditor
                    content={content}
                    onDoneEdit={updateContentValue}
                    markActions={richTextEditorSettings[content.attributes.richTextEditorType].marks}
                    blockActions={richTextEditorSettings[content.attributes.richTextEditorType].blocks}
                    singleLine={richTextEditorSettings[content.attributes.richTextEditorType].singleLine}
                />
            }
        </div>
    );
}
