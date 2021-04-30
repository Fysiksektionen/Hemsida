import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { BlockFeed, ColumnsBlock } from '../../../types/content_objects/blocks';
import BlockFeedCOR from '../BlockFeedCOR';
import { ContentTreeAddIdContext, ContentTreeContext, EditorialModeContext } from '../../../contexts';
import SettingsIcon from '@material-ui/icons/Settings';
import { Popover } from '@material-ui/core';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import { emptyBlockFeed } from '../BlockFeedCOE';
import CancelIcon from '@material-ui/icons/Cancel';

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
    const [sizes, setSizes] = useState(content.attributes.sizes);
    const [error, setError] = useState(false);

    useEffect(() => {
        setSizes(content.attributes.sizes);
    }, [content.attributes.sizes]);

    function updateContent(newSizes: number[]) {
        const sum = newSizes.reduce((a, b) => a + b, 0);
        if (sum > 12 || sum <= 0) {
            setError(true);
        } else {
            setError(false);
            const newCO = {
                ...content,
                attributes: { ...content.attributes }
            };
            newCO.attributes.sizes = newSizes;
            dispatch({ id: content.id, value: newCO });
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<EventTarget & Element | null>(null);
    function onClick(event: React.MouseEvent) {
        setAnchorEl(event.currentTarget);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, i: number) => {
        console.log(event.target.value, Number.isInteger(parseInt(event.target.value)));
        if (Number.isInteger(parseInt(event.target.value))) {
            const newSizes = [...sizes];
            newSizes[i] = parseInt(event.target.value, 10);
            setSizes(newSizes);
            updateContent(newSizes);
        }
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
            >
                <Container className='py-3'>
                    <Form>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label className='font-weight-bold'>Column sizes (integers with sum &le; 12)</Form.Label>
                            {error && <Form.Text >Whops, something is a bit off with your values...</Form.Text>}

                            <Row>
                                {content.items.map((feed, i) => (
                                    <Col key={i}>
                                        <Form.Control
                                            value={sizes[i]}
                                            isInvalid={error}
                                            isValid={!error}
                                            type='number'
                                            min='1'
                                            max='12'
                                            onChange={ event => handleChange(event, i)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>
                    </Form>
                </Container>
            </Popover>
        </>
    );
}

type AddColumnButtonProps = {
    index: number,
    content: ColumnsBlock,
    sizePx: number
}
/**
 * Edit the block at index in the list of children of `content`.
 * @constructor
 */
function AddColumnButton({ index, content, sizePx }: AddColumnButtonProps) {
    const dispatch = useContext(ContentTreeContext);
    const newCOId = useContext(ContentTreeAddIdContext);

    function onClick(index: number) {
        const newContent = { ...content };

        // Calc new sizes. Spread equally, and don't add if full. Fill with first column.
        const sizes = new Array(content.items.length + 1);
        const colSize = Math.floor(12 / (content.items.length + 1));
        if (colSize !== 0) {
            const firstColSize = 12 - colSize * content.items.length;
            sizes[0] = firstColSize;
            for (let i = 1; i < sizes.length; i++) {
                sizes[i] = colSize;
            }
            sizes[0] = firstColSize;
            newContent.attributes.sizes = sizes;

            // insert new BlockFeed
            const items = content.items.slice(0, index + 1);
            const newColumn = JSON.parse(JSON.stringify(emptyBlockFeed));

            newColumn.id = newCOId.id;
            newCOId.decrementHook({});

            items.push(newColumn);
            newContent.items = items.concat(content.items.slice(index + 1, undefined)) as BlockFeed[];

            // Update tree
            dispatch({ id: content.id, value: newContent });
        }
    }

    const className = 'position-relative show-children-on-hover text-center';

    return (
        <div
            className={className}
            style={{
                top: '25%',
                bottom: '25%',
                width: 0
            }}
        >
            <div
                className='position-absolute show-children-on-hover text-center'
                style={{
                    top: '25%',
                    bottom: '25%',
                    left: '-' + (sizePx / 2).toString() + 'px',
                    width: sizePx.toString() + 'px'
                }}
            >

                <AddCircleSharpIcon
                    className='position-absolute show-on-parent-hover my-auto'
                    onClick={() => onClick(index)}
                    style={{
                        height: sizePx,
                        width: sizePx,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                />
            </div>
        </div>
    );
}

type RemoveBlockButtonProps = {
    index: number,
    content: ColumnsBlock,
    sizePx: number
}

/**
 * Removes the block at index in the list of children of `content`.
 * @param index Index to remove at
 * @param content ColumnsBlock containing the list from which to remove the item
 * @param sizePx Size of icon in pixels
 * @constructor
 */
function RemoveColumnButton({ index, content, sizePx }: RemoveBlockButtonProps) {
    const dispatch = useContext(ContentTreeContext);

    function deleteBlock(index: number) {
        const newCOFeed = {
            ...content
        };
        newCOFeed.items = content.items.slice(0, index).concat(content.items.slice(index + 1, undefined)) as BlockFeed[];
        newCOFeed.attributes.sizes = newCOFeed.attributes.sizes.slice(0, index).concat(content.attributes.sizes.slice(index + 1, undefined));

        dispatch({ id: content.id, value: newCOFeed });
    }

    return (
        <CancelIcon
            className='position-absolute show-on-parent-hover'
            onClick={() => deleteBlock(index)}
            style={{
                width: sizePx.toString() + 'px',
                height: sizePx.toString() + 'px',
                right: '-' + (sizePx / 2).toString() + 'px',
                top: '-' + (sizePx / 2).toString() + 'px'
            }}
        />
    );
}

/**
 * A block renderer for ColumnsBlocks. I.e used in BlockFeed
 * @param content The ColumnsBlock to show and edit.
 * @constructor
 */
export default function ColumnsBlockCOR({ content }: {content: ColumnsBlock}) {
    const sizes = content.attributes.sizes;
    const validSplit = sizes.reduce((a, b) => a + b, 0) <= 12 && content.items.length === sizes.length;

    const iconSize = 30;

    const edit = useContext(EditorialModeContext);

    console.log(content);

    return (validSplit
        ? <Col xs={12} className='show-children-on-hover'>
            {edit &&
                <EditColumnsBlockButton content={content}
                    style={{
                        width: iconSize.toString() + 'px',
                        height: iconSize.toString() + 'px',
                        right: (1.5 * iconSize / 2).toString() + 'px',
                        top: '-' + (iconSize / 2).toString() + 'px'
                    }}
                />
            }
            <div style={{ minHeight: iconSize.toString() + 'px' }} />
            <Row>
                <AddColumnButton content={content} index={-1} sizePx={30} />
                {content.items.map((blockFeed, i) => {
                    const paddingClasses = edit ? (((i !== 0) ? 'pl-2 ' : ' ') + ((i !== content.items.length - 1) ? 'pr-2' : ' ')) : '';
                    return (
                        <>
                            <Col xs={12} md={sizes[i]} key={i} className='soft-dashed-border-on-hover show-children-on-hover'>
                                <RemoveColumnButton index={i} content={content} sizePx={30}/>
                                <div style={{ minHeight: iconSize.toString() + 'px' }} />
                                <Row className={paddingClasses}>
                                    <BlockFeedCOR content={(blockFeed as BlockFeed)} />
                                </Row>
                                <div style={{ minHeight: iconSize.toString() + 'px' }} />
                            </Col>
                            <AddColumnButton content={content} index={i} sizePx={30} />
                        </>
                    );
                })}
            </Row>
            <div style={{ minHeight: iconSize.toString() + 'px' }} />
        </Col>
        : <Col className='text-center'>{content.attributes.blockType}</Col>
    );
}
