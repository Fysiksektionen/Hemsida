import React, { ImgHTMLAttributes, useContext, useState } from 'react';
import { ContentObjectTreeContext, EditorialModeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';
import TextEditorModal from '../editors/TextEditorModal';

type TextCOProps = ImgHTMLAttributes<HTMLImageElement> & {
    textCO: ContentText,
}

/**
 * Renders a ContentText and allows for changing the text using a popup when in EditorialModeContext.
 * @param props: The ContentImage object.
 */
export default function TextCO(props: TextCOProps) {
    const [showModal, setShowModal] = useState(false);
    const contentTreeDispatcher = useContext(ContentObjectTreeContext);

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
