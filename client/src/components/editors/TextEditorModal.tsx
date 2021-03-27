import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Col, Modal, Image, Row, Container, Form, Button } from 'react-bootstrap';
import defaultLogo from '../../Fysiksektionen_logo.svg';
import img1 from '../../placeholder_images/news_placeholder.jpg';
import img2 from '../../placeholder_images/news_placeholder1.jpg';
import img3 from '../../placeholder_images/news_placeholder2.jpg';
import img4 from '../../placeholder_images/news_placeholder3.jpg';

type TextEditorModalProps = {
    show: boolean,
    setShow: (state: boolean) => void,
    setText: (text: string) => void,
    initialText?: string
}

export default function TextEditorModal({ show, setShow, setText, initialText }: TextEditorModalProps) {
    const [text, setInternalText] = useState(initialText !== undefined ? initialText : '');

    function onSubmit(event: FormEvent) {
        console.log(text);
        setText(text);
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
                                defaultValue={initialText}
                                onChange={(event: ChangeEvent<any>) => {
                                    setInternalText(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'success'}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
