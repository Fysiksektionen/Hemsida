import React, { useContext, useState } from 'react';
import { ContentObjectTreeContext, EditorialModeContext } from '../../contexts';
import ImagePickerCOE from '../content_object_editors/ImagePickerCOE';
import { ContentImage } from '../../types/api_object_types';
import { Image } from 'react-bootstrap';
import { ImageProps } from 'react-bootstrap/Image';

type ImageCOProps = ImageProps & React.RefAttributes<HTMLImageElement> & {
    imageCO: ContentImage,
}

/**
 * Renders a ContentImage and allows for changing the image using a popup when in EditorialModeContext.
 * @param props: The ContentImage object.
 */
export default function ImageCOR(props: ImageCOProps) {
    const [showModal, setShowModal] = useState(false);
    const contentTreeDispatcher = useContext(ContentObjectTreeContext);

    function updateImageHook(imgHref: string) {
        const newImage = { ...props.imageCO, image: { ...props.imageCO.image, href: imgHref } };
        contentTreeDispatcher({ id: props.imageCO.id, value: newImage });
    }

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <ImagePickerCOE show={showModal} setImage={updateImageHook} setShow={setShowModal} />
                    <Image
                        src={props.imageCO.image.href}
                        {...(props as (ImageProps & React.RefAttributes<HTMLImageElement>))}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
