import React, { ImgHTMLAttributes, useState } from 'react';
import { EditorialModeContext, useContentObjectTreeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';
import TextEditorModal from '../editors/TextEditorModal';

type TextCOProps = ImgHTMLAttributes<HTMLImageElement> & {
    textCO: ContentText,
}

export default function TextCO(props: TextCOProps) {
    const [showModal, setShowModal] = useState(false);
    const contentTreeDispatcher = useContentObjectTreeContext();

    function updateTextHook(text: string) {
        const newText = { ...props.textCO, text: text };
        contentTreeDispatcher({ id: props.textCO.id, value: newText });
    }

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <TextEditorModal show={showModal} setText={updateTextHook} setShow={setShowModal} initialText={props.textCO.text} />
                    <span onClick={editing ? () => setShowModal(true) : () => {}}>{props.textCO.text}</span>
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
