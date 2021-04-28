import React, { CSSProperties, useContext } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { BlockFeed, ColumnsBlock } from '../../../types/content_objects/blocks';
import BlockFeedCOR from '../BlockFeedCOR';
import { ContentTreeContext } from '../../../contexts';
import SettingsIcon from '@material-ui/icons/Settings';
import { Popover } from '@material-ui/core';

type EditBlockButtonProps = {
    content: ColumnsBlock,
    style?: CSSProperties
}

/**
 * Edit the block at index in the list of children of `content`.
 * @param index Index to edit
 * @param content ContentList containing the list from which to edit the item
 * @param style Extra styling added to the <i> tag
 * @constructor
 */
function EditColumnsBlockButton({ content, style }: EditBlockButtonProps) {
    const dispatch = useContext(ContentTreeContext);

    function updateContent(split: number) {
        const newCO = {
            ...content,
            attributes: { ...content.attributes }
        };
        newCO.attributes.split = split;
        dispatch({ id: content.id, value: newCO });
    }

    const [anchorEl, setAnchorEl] = React.useState<EventTarget & Element | null>(null);
    function onClick(event: React.MouseEvent) {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateContent(parseInt(event.target.value, 10));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const popoverId = 'popover-edit-columns-' + content.id;

    return (
        <>
            <SettingsIcon
                className='position-absolute show-on-parent-hover'
                aria-describedby={popoverId}
                style={style}
                onClick={onClick}
            />
            <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                className='zoom-xs-10 zoom-xl-8'
            >
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Column width (left column)</Form.Label>
                            <Form.Control
                                value={content.attributes.split}
                                type="range"
                                min="1"
                                max="11"
                                step="1"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Popover>
        </>
    );
}

/**
 * A block renderer for ColumnsBlocks. I.e used in BlockFeed
 * @param content The ColumnsBlock to show and edit.
 * @constructor
 */
export default function ColumnsBlockCOR({ content }: {content: ColumnsBlock}) {
    const split = content.attributes.split;
    const validSplit = Number.isInteger(split) && split >= 1 && split <= 11;

    const iconSize = 30;

    return (validSplit
        ? <Col xs={12} className='show-children-on-hover'>
            <EditColumnsBlockButton content={content}
                style={{
                    width: iconSize.toString() + 'px',
                    height: iconSize.toString() + 'px',
                    right: (1.5 * iconSize / 2).toString() + 'px',
                    top: '-' + (iconSize / 2).toString() + 'px'
                }}
            />
            <div style={{ minHeight: iconSize.toString() + 'px' }} />
            <Row>
                <Col xs={12} md={split}>
                    <Row>
                        <BlockFeedCOR content={content.items.left} borderedEditor={true} />
                    </Row>
                </Col>
                <Col xs={12} md={12 - split}>
                    <Row>
                        <BlockFeedCOR content={content.items.right} borderedEditor={true} />
                    </Row>
                </Col>
            </Row>
            <div style={{ minHeight: iconSize.toString() + 'px' }} />
        </Col>
        : <Col className='text-center'>{content.attributes.blockType}</Col>
    );
}
