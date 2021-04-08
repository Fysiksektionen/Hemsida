import React from 'react';
import { Col, Modal, Image, Row } from 'react-bootstrap';
import defaultLogo from '../../Fysiksektionen_logo.svg';
import img1 from '../../mediafiles/placeholder_images/news_placeholder.jpg';
import img2 from '../../mediafiles/placeholder_images/news_placeholder1.jpg';
import img3 from '../../mediafiles/placeholder_images/news_placeholder2.jpg';
import img4 from '../../mediafiles/placeholder_images/news_placeholder3.jpg';

type ImagePickerModalProps = {
    show: boolean,
    setShow: (image: boolean) => void,
    setImage: (image: string) => void
}

export default function ImagePickerCOE({ show, setShow, setImage }: ImagePickerModalProps) {
    const images = [defaultLogo, img1, img2, img3, img4];

    return (
        <Modal
            show={show}
            onHide={() => { setShow(false); }}
            size="xl"
            aria-labelledby="image-picker"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="image-picker">Pick an image!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-between h-100">
                    {images.map((imgSrc, index) => (
                        <Col key={index} xs={2} className="my-auto">
                            <Image fluid={true} src={imgSrc} onClick={() => { setImage(imgSrc); setShow(false); }}/>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
