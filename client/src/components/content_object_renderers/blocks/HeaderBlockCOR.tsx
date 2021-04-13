import { HeaderBlock } from '../../../types/content_objects/blocks';
import { Form, Row } from 'react-bootstrap';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ContentTreeContext, EditorialModeContext } from '../../../contexts';

export default function HeaderBlockCOR({ content }: {content: HeaderBlock}) {
    // Internal state during edit
    const [text, setInternalText] = useState(content.text);
    useEffect(() => {
        setInternalText(content.text);
    }, [content.text]);

    const dispatch = useContext(ContentTreeContext);

    function updateContentValue() {
        dispatch({ id: content.id, value: { ...content, text: text } });
    }

    const edit = useContext(EditorialModeContext);
    const sizeToValue: NodeJS.Dict<JSX.Element> = {
        1: <h1>{text}</h1>,
        2: <h2>{text}</h2>,
        3: <h3>{text}</h3>,
        4: <h4>{text}</h4>,
        5: <h5>{text}</h5>
    };

    const renderContent = !edit
        ? sizeToValue[content.attributes.size]
        : <Form.Control
            className={'w-100 px-0 invisible-input' + ' h' + content.attributes.size.toString()}
            type="text"
            placeholder=""
            defaultValue={text}
            onChange={(event) => { setInternalText(event.currentTarget.value); }}
            onBlur={updateContentValue}
        />;

    if (renderContent !== undefined) {
        return (
            <Row className='w-100'>
                {renderContent}
            </Row>
        );
    } else {
        return <Row>Size not found in attributes error: CO.id == {content.id}</Row>;
    }
}
