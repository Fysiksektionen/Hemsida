import React, { useContext } from 'react';
import { ContentImage, ContentList, ContentObject, ContentText } from '../../types/api_object_types';
import { Col, Container, Row } from 'react-bootstrap';
import { ContentTreeAddIdContext, ContentTreeContext } from '../../contexts';
import { ContentObjectFeed } from '../../types/content_object_trees';
import { Popover } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import FLargeIconButton from '../f-styled/buttons/FLargeIconButton';
import TextCOR from '../content_object_renderers/TextCOR';
import ImageCOR from '../content_object_renderers/ImageCOR';

type BlockType = 'text' | 'image'
const defaultBlocks: {[key: string]: ContentObject} = {
    text: {
        id: -1,
        detailUrl: '',
        dbType: 'text',
        attributes: {},
        text: 'New item: -1'
    } as ContentText,
    image: {
        id: -1,
        detailUrl: '',
        dbType: 'image',
        attributes: {},
        image: {
            id: -1,
            detailUrl: '',
            href: ''
        }
    } as ContentImage
};

/**
 * Adds a block *after* index in the list of children of FeedCO.
 * @param index The index in FeedCO.items to add blick after
 * @param ListCO The CO containing list of feed as items.
 * @constructor
 */
function AddBlockButton({ index, FeedCO }: { index: number, FeedCO: ContentObjectFeed }) {
    const dispatch = useContext(ContentTreeContext);
    const addIdState = useContext(ContentTreeAddIdContext);

    function add(blockType: BlockType) {
        const newBlock = defaultBlocks[blockType] as ContentObject;
        newBlock.id = addIdState.id;
        addIdState.decrementHook({});

        const newCOFeed = {
            ...FeedCO
        };
        const items = FeedCO.items.slice(0, index + 1);
        items.push(newBlock);
        newCOFeed.items = items.concat(FeedCO.items.slice(index + 1, undefined));

        dispatch({ id: FeedCO.id, value: newCOFeed });
    }

    const [anchorEl, setAnchorEl] = React.useState<EventTarget & Element | null>(null);
    function onClick(event: React.MouseEvent) {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const popoverId = 'popover-' + index;

    return (
        <>
            <div className='d-flex justify-content-center w-100 show-children-on-hover' style={{ height: '30px' }}>
                <div
                    className='show-on-parent-hover text-center'
                    aria-describedby={popoverId}
                    style={{ width: '30px' }}
                    onClick={onClick}
                >
                    <i className='fa fa-plus-circle' />
                </div>
            </div>
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
                <Container>
                    <Row>
                        <Col>
                            <FLargeIconButton text='Text' Icon={TextFieldsIcon} onClick={() => add('text')}/>
                        </Col>
                        <Col>
                            <FLargeIconButton text='Image' Icon={ImageIcon} onClick={() => add('image')}/>
                        </Col>
                    </Row>
                </Container>
            </Popover>
        </>
    );
}

export type ContentObjectFeedCOEProps = {
    content: ContentList
}

export default function ContentObjectFeedCOE({ content }: ContentObjectFeedCOEProps) {
    const dispatch = useContext(ContentTreeContext);

    function deleteBlock(index: number) {
        const newCOFeed = {
            ...content
        };
        const items = content.items.slice(0, index);
        newCOFeed.items = items.concat(content.items.slice(index + 1, undefined));

        dispatch({ id: content.id, value: newCOFeed });
    }

    return (
        <Col xs={12}>
            <Row>
                <AddBlockButton index={-1} FeedCO={content} />
            </Row>
            {content.items.map((obj, index) => {
                let objectRender = <></>;
                if (obj.dbType === 'text') {
                    objectRender = <TextCOR textCO={obj} />;
                } else if (obj.dbType === 'image') {
                    objectRender = <ImageCOR imageCO={obj} className='w-100' />;
                }

                return (
                    <>
                        <Row className='position-relative show-children-on-hover'>
                            <i
                                className='position-absolute fa fa-times-circle show-on-parent-hover '
                                style={{
                                    top: '-10px',
                                    right: '-10px',
                                    width: '20px',
                                    height: '20px'
                                }}
                                onClick={() => deleteBlock(index)}
                            />
                            {objectRender}
                        </Row>
                        <Row>
                            <AddBlockButton index={index} FeedCO={content} />
                        </Row>
                    </>
                );
            })}
        </Col>
    );
}
