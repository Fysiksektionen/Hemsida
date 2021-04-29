import React, { useContext } from 'react';
import { Col, Modal, Image, Row } from 'react-bootstrap';
import defaultLogo from '../../mediafiles/placeholder_images/Fysiksektionen_logo.svg';
import img1 from '../../mediafiles/placeholder_images/news_placeholder.jpg';
import img2 from '../../mediafiles/placeholder_images/news_placeholder1.jpg';
import img3 from '../../mediafiles/placeholder_images/news_placeholder2.jpg';
import img4 from '../../mediafiles/placeholder_images/news_placeholder3.jpg';
import { ContentTreeContext } from '../../contexts';
import { ContentImage } from '../../types/api_object_types';

type ImageCOEProps = {
    show: boolean,
    setShow: (image: boolean) => void,
    content: ContentImage
}

/**
 * Popup image-picker for a ContentImage.
 * @param show Weather to show the popup or not
 * @param setShow Hook to alter show/hide
 * @param content The ContentImage to edit
 * @constructor
 */
export default function ImageCOE({ show, setShow, content }: ImageCOEProps) {
    const images = [defaultLogo, img1, img2, img3, img4];
    const CTDispatcher = useContext(ContentTreeContext);

    function updateImage(imgHref: string) {
        const newImage = { ...content, image: { ...content.image, href: imgHref } };
        CTDispatcher({ id: content.id, value: newImage });
    }

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
                            <Image fluid={true} src={imgSrc} onClick={() => { updateImage(imgSrc); setShow(false); }}/>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
