import { HeaderBlock, RichTextBlock } from '../../../types/content_objects/blocks';
import { Row } from 'react-bootstrap';
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

    const renderContent = !edit
        ? <>{ parse(content.text) }</>
        : <RichTextEditor
            content={content}
            onDoneEdit={updateContentValue}
            markActions={[]}
            blockActions={['h1', 'h2', 'h3', 'h4', 'h5']}
        />;

    if (renderContent !== undefined) {
        return (
            <div className='w-100'>
                {renderContent}
            </div>
        );
    } else {
        return <Row>Size not found in attributes error: CO.id == {content.id}</Row>;
    }
}
