import React, { useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import ImagePickerModalCOE from '../content_object_editors/ImagePickerModalCOE';
import { ContentImage } from '../../types/api_object_types';
import { Image } from 'react-bootstrap';
import { ImageProps } from 'react-bootstrap/Image';
import placeholder from '../../mediafiles/placeholder_images/placeholder_image.png';

type ImageCOProps = ImageProps & React.RefAttributes<HTMLImageElement> & {
    imageCO: ContentImage,
}

/**
 * Renders a ContentImage and allows for changing the image using a popup when in EditorialModeContext.
 * @param props: The ContentImage object.
 */
export default function ImageCOR(props: ImageCOProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='w-100'>
                    <ImagePickerModalCOE content={props.imageCO} show={showModal} setShow={setShowModal} />
                    <Image
                        src={props.imageCO.image.href !== '' ? props.imageCO.image.href : placeholder}
                        {...(props as (ImageProps & React.RefAttributes<HTMLImageElement>))}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
