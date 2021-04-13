import React, { useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import { OrangeInfoBoxCT } from '../../types/content_objects/pages/frontpage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CenteredText as Centered } from '../Centered';
import parse from 'html-react-parser';
import FButton from '../f-styled/buttons/FButton';
import InfoBoxModalCOE from '../content_object_editors/InfoBoxModalCOE';

/**
 * Renders an InfoBox and allows for changing the title, text, color and button using a popup when in EditorialModeContext.
 */
export default function InfoBoxCOR(props: {content: OrangeInfoBoxCT}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='h-100'>
                    <InfoBoxModalCOE content={props.content} show={showModal} setShow={setShowModal} />
                    <Row className="d-flex flex-column align-content-center m-0 p-0 h-100"
                        style={{ backgroundColor: props.content.attributes.color }}
                        onClick={editing ? () => setShowModal(true) : () => {}}
                    >
                        <Col xs={12} sm={10} md={8} lg={12}
                            className="d-flex flex-column h-100 p-5 py-lg-5 px-lg-3 px-xxl-5"
                            style={{ backgroundColor: props.content.attributes.color }}
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
                                        backgroundImage: 'linear-gradient(to bottom, transparent, ' + props.content.attributes.color + ')',
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
