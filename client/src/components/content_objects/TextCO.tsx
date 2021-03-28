import React, { useContext, useState } from 'react';
import { ContentObjectTreeContext, EditorialModeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';
import TextEditorModal from '../editors/TextEditorModal';

type TextCOProps = {
    textCO: ContentText,
    preText?: string,
    postText?: string
}

export default function TextCO(props: TextCOProps) {
    const [showModal, setShowModal] = useState(false);
    const contentTreeDispatcher = useContext(ContentObjectTreeContext);

    const preText = props.preText !== undefined ? props.preText : '';
    const postText = props.postText !== undefined ? props.postText : '';

    function updateTextHook(text: string) {
        const newText = { ...props.textCO, text: text };
        contentTreeDispatcher({ id: props.textCO.id, value: newText });
    }

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <TextEditorModal show={showModal} setText={updateTextHook} setShow={setShowModal} initialText={props.textCO.text} />
                    <span onClick={editing ? () => setShowModal(true) : () => {}}>{preText + props.textCO.text + postText}</span>
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
