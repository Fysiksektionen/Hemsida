import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Col, Modal, Container, Form, Button } from 'react-bootstrap';
import { ContentObjectTreeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';

type TextEditorModalProps = {
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
export default function TextModalCOE({ show, setShow, content }: TextEditorModalProps) {
    // Internal state during edit
    const [text, setInternalText] = useState(content.text);

    // Use context to get the dispatcher function
    const CTDispatcher = useContext(ContentObjectTreeContext);

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
                <Modal.Title id="text-editor">Pick an image!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="rootUrl" as={Col} md={4}>
                            <Form.Label>Text field</Form.Label>
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
                            Spara
                        </Button>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
