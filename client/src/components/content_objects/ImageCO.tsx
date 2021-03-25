import React, { ImgHTMLAttributes, useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import ImagePickerModal from '../editors/ImagePickerModal';

type ImageCOProps = ImgHTMLAttributes<HTMLImageElement> & {
    updateHook: React.Dispatch<React.SetStateAction<string>>
}

export default function ImageCO(props: ImageCOProps) {
    const updateImageHook = props.updateHook;
    const [showModal, setShowModal] = useState(false);

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <ImagePickerModal show={showModal} setImage={updateImageHook} setShow={setShowModal} />
                    <img
                        {...(props as ImgHTMLAttributes<HTMLImageElement>)}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
