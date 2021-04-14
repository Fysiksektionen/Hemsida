import { HeaderBlock, RichTextBlock } from '../../../types/content_objects/blocks';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';
import RichTextEditor from './rich_text_editor/RichTextEditor';
import { BlockTypes } from './rich_text_editor/custom_types';

export default function RichTextCOR({ content }: {content: RichTextBlock}) {
    const dispatch = useContext(ContentTreeContext);

    function updateContentValue(block: RichTextBlock | HeaderBlock) {
        dispatch({ id: block.id, value: { ...block } });
    }

    const edit = useContext(EditorialModeContext);
    return (
        <div className='w-100'>
            {!edit
                ? <>{ parse(content.text) }</>
                : <RichTextEditor
                    content={content}
                    onDoneEdit={updateContentValue}
                    blockActions={['bulleted-list', 'numbered-list'] as BlockTypes[]}
                />
            }
        </div>
    );
}
