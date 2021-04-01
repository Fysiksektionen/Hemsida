import React, { useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import { ContentText } from '../../types/api_object_types';
import TextEditorCOE from '../content_object_editors/TextEditorCOE';

type TextCORProps = {
    textCO: ContentText,
    preText?: string,
    postText?: string
}

/**
 * Renders a ContentText and allows for changing the text using a popup when in EditorialModeContext.
 * @param props: The ContentText object and pre and post strings added to the CO's text.
 */
export default function TextCOR(props: TextCORProps) {
    const [showModal, setShowModal] = useState(false);

    const preText = props.preText !== undefined ? props.preText : '';
    const postText = props.postText !== undefined ? props.postText : '';

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div>
                    <TextEditorCOE content={props.textCO} show={showModal} setShow={setShowModal} />
                    <span onClick={editing ? () => setShowModal(true) : () => {}}>{preText + props.textCO.text + postText}</span>
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
