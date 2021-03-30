import React, { useContext, useState } from 'react';
import { ContentObjectTreeContext, EditorialModeContext } from '../../contexts';
import { OrangeInfoBoxContentTree } from '../../types/content_object_trees';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CenteredText as Centered } from '../Centered';
import parse from 'html-react-parser';
import FButton from '../f-styled/buttons/FButton';
import InfoBoxEditorCOE, { InfoBoxData } from '../content_object_editors/InfoBoxEditorCOE';

/**
 * Renders an InfoBox and allows for changing the title, text, color and button using a popup when in EditorialModeContext.
 */
export default function InfoBoxCOR(props: {content: OrangeInfoBoxContentTree, bgColor: string}) {
    const [showModal, setShowModal] = useState(false);
    const contentTreeDispatcher = useContext(ContentObjectTreeContext);

    function updateInfoBoxHook(data: InfoBoxData) {
        const newContentTree = {
            ...props.content,
            attributes: {
                color: data.color
            },
            items: {
                title: {
                    ...props.content.items.title,
                    text: data.title
                },
                text: {
                    ...props.content.items.text,
                    text: data.text
                },
                button: {
                    ...props.content.items.button,
                    attributes: {
                        link: data.buttonLink
                    },
                    text: data.buttonText
                }
            }
        };
        contentTreeDispatcher({ id: props.content.id, value: newContentTree });
    }

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='h-100'>
                    <InfoBoxEditorCOE show={showModal} setShow={setShowModal} setData={updateInfoBoxHook} initial={{
                        color: props.content.attributes.color,
                        title: props.content.items.title.text,
                        text: props.content.items.text.text,
                        buttonText: props.content.items.button.text,
                        buttonLink: props.content.items.button.attributes.link
                    }} />
                    <Row className="d-flex flex-column align-content-center m-0 p-0 h-100"
                        style={{ backgroundColor: props.bgColor }}
                        onClick={editing ? () => setShowModal(true) : () => {}}
                    >
                        <Col xs={12} sm={10} md={8} lg={12}
                            className="d-flex flex-column h-100 p-5 py-lg-5 px-lg-3 px-xxl-5"
                            style={{ backgroundColor: props.bgColor }}
                        >
                            <Centered><h2 className='font-weight-bolder'>{props.content.items.title.text}</h2></Centered>
                            <div className="p-3 d-none d-xxl-inline">
                                {parse(props.content.items.text.text)}
                            </div>
                            <div className="p-3 position-relative overflow-hidden d-xxl-none"
                                style={{ maxHeight: '120px' }}>
                                {parse(props.content.items.text.text)}
                                <div
                                    className='position-absolute text-center pt-5'
                                    style={{
                                        backgroundImage: 'linear-gradient(to bottom, transparent, ' + props.bgColor + ')',
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    }}
                                >
                                    <i className='fa fa-angle-down'/>
                                </div>
                            </div>
                            <div className='flex-grow-1 my-2'/>
                            <Centered>
                                <FButton
                                    text={props.content.items.button.text}
                                    href={editing ? '#' : props.content.items.button.attributes.link}
                                    style={{ fontSize: '1rem' }}
                                />
                            </Centered>
                        </Col>
                    </Row>
                </div>
            }
        </EditorialModeContext.Consumer>

    );
}
