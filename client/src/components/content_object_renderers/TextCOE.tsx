import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Col, Modal, Form, Button } from 'react-bootstrap';
import { ContentTreeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';

type TextCOEProps = {
    show: boolean,
    setShow: (state: boolean) => void,
    content: ContentText
}

/**
 * Modal editor of single ContentText.
 * @param show: Boolean to show/hide the modal.
 * @param setShow: Hook to alter the show variable.
 * @param content: The current ContentText with information to be edited.
 */
export default function TextCOE({ show, setShow, content }: TextCOEProps) {
    // Internal state during edit
    const [text, setInternalText] = useState(content.text);
    useEffect(() => {
        setInternalText(content.text);
    }, [content.text]);

    // Use context to get the dispatcher function
    const CTDispatcher = useContext(ContentTreeContext);

    // Create new ContentText That copies the previous object and changes text. Send to disptcher
    function updateTextHook(text: string) {
        const newText = { ...content, text: text };
        CTDispatcher({ id: content.id, value: newText });
    }

    // Update content of tree and close modal on submit.
    function onSubmit(event: FormEvent) {
        updateTextHook(text);
        setShow(false);
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <Modal
            show={show}
            onHide={() => { setShow(false); }}
            size="xl"
            aria-labelledby="text-editor"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="text-editor">Textredigerare</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="rootUrl" as={Col} md={4}>
                        <Form.Control
                            type="text"
                            placeholder=""
                            defaultValue={text}
                            onChange={(event: ChangeEvent<any>) => {
                                setInternalText(event.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button type={'submit'} variant={'success'}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
