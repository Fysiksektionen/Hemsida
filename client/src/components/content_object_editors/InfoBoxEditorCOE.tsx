import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Col, Modal, Container, Form, Button } from 'react-bootstrap';

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
    setData: (data: InfoBoxData) => void,
    initial?: InfoBoxData
}

export default function InfoBoxEditorCOE({ show, setShow, setData, initial }: InfoBoxModalProps) {
    const [data, setInternalData] = useState(initial !== undefined
        ? initial
        : { color: '#FF642B', title: '', text: '', buttonText: '', buttonLink: '' }
    );

    useEffect(() => {
        if (initial !== undefined) {
            setInternalData(initial);
        }
    }, [initial, setInternalData]);

    function onSubmit(event: FormEvent) {
        setData(data);
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
                                    defaultValue={initial?.color}
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
                                    defaultValue={initial?.title}
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
                                    defaultValue={initial?.text}
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
                                    defaultValue={initial?.buttonText}
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
                                    defaultValue={initial?.buttonLink}
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
