import { HeaderBlock, RichTextBlock } from '../../../types/content_objects/blocks';
import React, { useContext } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';
import RichTextEditor from './rich_text_editor/RichTextEditor';
import parse from 'html-react-parser';

export default function HeaderBlockCOR({ content }: {content: HeaderBlock}) {
    const dispatch = useContext(ContentTreeContext);

    function updateContentValue(text: RichTextBlock | HeaderBlock) {
        dispatch({ id: content.id, value: { ...text } });
    }

    const edit = useContext(EditorialModeContext);
    return (
        <div className='w-100'>
            {!edit
                ? <>{ parse(content.text) }</>
                : <RichTextEditor
                    content={content}
                    onDoneEdit={updateContentValue}
                    markActions={[]}
                    blockActions={['h1', 'h2', 'h3', 'h4', 'h5']}
                />
            }
        </div>
    );
}
