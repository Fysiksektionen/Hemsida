// @ts-ignore

import React from 'react';
import { EditorialModeContext } from '../../contexts';
import { OrangeInfoBoxCT } from '../../types/content_objects/content_trees/pages';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CenteredText as Centered } from '../Centered';
import RichTextCOR from './blocks/RichTextCOR';
import { Button } from 'react-bootstrap';

/**
 * Renders an InfoBox and allows for changing the title and text using RichTextEditor when in EditorialModeContext.
 */
export default function InfoBox2COR(props: {content: OrangeInfoBoxCT}) {
    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='h-100'>
                    <Row className="d-flex flex-column align-content-center m-0 p-0 h-100"
                        style={{ backgroundColor: props.content.attributes.color }}
                    >
                        <Col xs={12} sm={10} md={8} lg={12}
                            className="d-flex flex-column h-100 p-5 py-lg-5 px-lg-3 px-xxl-5"
                            style={{ backgroundColor: props.content.attributes.color }}
                        >
                            <Centered>
                                <h2 className='font-weight-bolder text-break'>
                                    <RichTextCOR content={props.content.items.title} />
                                </h2>
                            </Centered>
                            <div className="p-3 d-none d-xxl-inline">
                                <RichTextCOR content={props.content.items.text} />
                            </div>
                            <div className="p-3 position-relative overflow-hidden d-xxl-none"
                                style={{ maxHeight: '120px' }}>
                                <RichTextCOR content={props.content.items.text} />
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
                                <Button
                                    variant='white'
                                    href={editing ? '#' : props.content.items.button.attributes.link}
                                    className='font-weight-bold px-3'
                                >
                                    {props.content.items.button.text}
                                </Button>
                            </Centered>
                        </Col>
                    </Row>
                </div>
            }
        </EditorialModeContext.Consumer>

    );
}
