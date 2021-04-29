import React, { useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import ImageCOE from './ImageCOE';
import { ContentImage } from '../../types/api_object_types';
import { Image } from 'react-bootstrap';
import { ImageProps } from 'react-bootstrap/Image';
import placeholder from '../../mediafiles/placeholder_images/placeholder_image.png';

type ImageCORProps = ImageProps & React.RefAttributes<HTMLImageElement> & {
    content: ContentImage,
}

/**
 * Renders a ContentImage and allows for changing the image using a popup when in EditorialModeContext.
 * @param props: The ContentImage object.
 */
export default function ImageCOR(props: ImageCORProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='w-100'>
                    <ImageCOE content={props.content} show={showModal} setShow={setShowModal} />
                    <Image
                        src={props.content.image.href !== '' ? props.content.image.href : placeholder}
                        {...(props as (ImageProps & React.RefAttributes<HTMLImageElement>))}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
