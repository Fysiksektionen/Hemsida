import { RichTextBlock } from '../../../types/content_objects/blocks';
import parse from 'html-react-parser';
import React from 'react';
import { EditorialModeContext } from '../../../contexts';
import RichTextCOE from './RichTextCOE/RichTextCOE';
import { SlateBlockType, SlateMarkType } from './RichTextCOE/slate_types';

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
    'only-marks': {
        marks: ['bold', 'italic', 'underline', 'code'],
        blocks: [],
        singleLine: true
    },
    none: {
        marks: [],
        blocks: [],
        singleLine: true
    },
    all: {
        marks: ['bold', 'italic', 'underline', 'code'],
        blocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'bulleted-list', 'numbered-list']
    }
};

export default function RichTextCOR({ content }: {content: RichTextBlock}) {
    return (
        <div className='w-100'>
            <EditorialModeContext.Consumer>
                {edit => {
                    return (!edit
                        ? <>{ parse(content.text) }</>
                        : <RichTextCOE
                            content={content}
                            markActions={richTextEditorSettings[content.attributes.richTextEditorType].marks}
                            blockActions={richTextEditorSettings[content.attributes.richTextEditorType].blocks}
                            singleLine={richTextEditorSettings[content.attributes.richTextEditorType].singleLine}
                        />
                    );
                }}
            </EditorialModeContext.Consumer>
        </div>
    );
}
