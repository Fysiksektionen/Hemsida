import React, { ImgHTMLAttributes, useContext, useState } from 'react';
import { ContentObjectTreeContext, EditorialModeContext } from '../../contexts';
import ImagePickerModal from '../editors/ImagePickerModal';
import { ContentImage } from '../../types/api_object_types';

type ImageCOProps = ImgHTMLAttributes<HTMLImageElement> & {
    imageCO: ContentImage,
}

export default function ImageCO(props: ImageCOProps) {
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
                    <ImagePickerModal show={showModal} setImage={updateImageHook} setShow={setShowModal} />
                    <img
                        src={props.imageCO.image.href}
                        {...(props as ImgHTMLAttributes<HTMLImageElement>)}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
