import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Col, Modal, Container, Form, Button } from 'react-bootstrap';
import { ContentObjectTreeContext } from '../../contexts';
import { OrangeInfoBoxCT } from '../../types/content_object_trees';

export type InfoBoxData = {
    color: string,
    title: string,
    text: string,
    buttonText: string,
    buttonLink: string
}

type InfoBoxModalProps = {
    show: boolean,
    setShow: (state: boolean) => void,
    content: OrangeInfoBoxCT
}

/**
 * Modal editor of the content of a OrangeInfoBoxCT. Uses internal state to save form data and then runs
 * dispatcher to update tree.
 * @param show: Boolean to show/hide the modal.
 * @param setShow: Hook to alter the show variable.
 * @param content: The current CT with information to be edited.
 */
export default function InfoBoxModalCOE({ show, setShow, content }: InfoBoxModalProps) {
    // Create internal state to save the form data temporarely.
    const [data, setInternalData] = useState({
        color: content.attributes.color,
        title: content.items.title.text,
        text: content.items.text.text,
        buttonText: content.items.button.text,
        buttonLink: content.items.button.attributes.link
    });

    // Use the ContentObjectTreeContext to get dispatcher method for updating.
    const CTDispatcher = useContext(ContentObjectTreeContext);

    // Hook to save data to content tree.
    function updateInfoBoxHook(data: InfoBoxData) {
        // Create new object copying everything that is not altered.
        const newCT = {
            ...content,
            attributes: {
                color: data.color
            },
            items: {
                title: {
                    ...content.items.title,
                    text: data.title
                },
                text: {
                    ...content.items.text,
                    text: data.text
                },
                button: {
                    ...content.items.button,
                    attributes: {
                        link: data.buttonLink
                    },
                    text: data.buttonText
                }
            }
        };
        // Update with new value
        CTDispatcher({ id: content.id, value: newCT });
    }

    // Submitting saves the data to the tree and then closes modal.
    function onSubmit(event: FormEvent) {
        updateInfoBoxHook(data);
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
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="text-editor">Redigera info-box</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={onSubmit}>
                        <Form.Row>
                            <Form.Group controlId="color" as={Col} md={4}>
                                <Form.Label>Färg</Form.Label>
                                <Form.Control
                                    defaultValue={data.color}
                                    onChange={(event: ChangeEvent<any>) => {
                                        setInternalData({
                                            ...data,
                                            color: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="title" as={Col} md={4}>
                                <Form.Label>Titel</Form.Label>
                                <Form.Control
                                    defaultValue={data.title}
                                    onChange={(event: ChangeEvent<any>) => {
                                        setInternalData({
                                            ...data,
                                            title: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="text" as={Col} md={8}>
                                <Form.Label>Text</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    rows={5}
                                    defaultValue={data.text}
                                    onChange={(event: ChangeEvent<any>) => {
                                        setInternalData({
                                            ...data,
                                            text: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="buttonText" as={Col}>
                                <Form.Label>Knapp-text</Form.Label>
                                <Form.Control
                                    defaultValue={data.buttonText}
                                    onChange={(event: ChangeEvent<any>) => {
                                        setInternalData({
                                            ...data,
                                            buttonText: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="buttonLink" as={Col}>
                                <Form.Label>Knapp-länk</Form.Label>
                                <Form.Control
                                    defaultValue={data.buttonLink}
                                    onChange={(event: ChangeEvent<any>) => {
                                        setInternalData({
                                            ...data,
                                            buttonLink: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
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
