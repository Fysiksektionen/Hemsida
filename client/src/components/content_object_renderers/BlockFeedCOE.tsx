import React, { CSSProperties, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ContentTreeAddIdContext, ContentTreeContext } from '../../contexts';
import { Block, BlockFeed, BlockType, ImageBlock, RichTextBlock } from '../../types/content_objects/blocks';
import { Popover, SvgIconTypeMap } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FLargeIconButton from '../f-styled/buttons/FLargeIconButton';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import BlockCOR from './blocks/BlockCOR';

/**
 * Array of available blocks in block chooser popup.
 */
const blockIcons: { blockType: BlockType, text: string, icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>}[] = [
    {
        blockType: 'heading',
        text: 'Heading',
        icon: TextFieldsIcon
    },
    {
        blockType: 'bodyText',
        text: 'Text',
        icon: FormatAlignLeftIcon
    },
    {
        blockType: 'image',
        text: 'Image',
        icon: ImageIcon
    }
];

/**
 * Definition of default blocks used for different block types.
 */
const defaultBlocks: {[key in BlockType]: Block} = {
    heading: {
        id: -1,
        detailUrl: '',
        dbType: 'text',
        attributes: {
            blockType: 'heading',
            richTextEditorType: 'only-headings'
        },
        text: '<h3></h3>'
    } as RichTextBlock,
    bodyText: {
        id: -1,
        detailUrl: '',
        dbType: 'text',
        attributes: {
            blockType: 'bodyText',
            richTextEditorType: 'body-text'
        },
        text: '<p></p>'
    } as RichTextBlock,
    image: {
        id: -1,
        detailUrl: '',
        dbType: 'image',
        attributes: {
            blockType: 'image',
            alignment: 'center',
            width: '100%'
        },
        image: {
            id: -1,
            detailUrl: '',
            href: ''
        }
    } as ImageBlock
};

type AddBlockButtonProps = {
    index: number,
    content: BlockFeed
}

/**
 * Adds a block *after* index in the list of children of FeedCO.
 * @param index The index in FeedCO.items to add blick after
 * @param ListCO The CO containing list of feed as items.
 * @constructor
 */
function AddBlockButton({ index, content }: AddBlockButtonProps) {
    const dispatch = useContext(ContentTreeContext);
    const addIdState = useContext(ContentTreeAddIdContext);

    function add(blockType: BlockType) {
        const newBlock = defaultBlocks[blockType];
        newBlock.id = addIdState.id;
        addIdState.decrementHook({});

        const newContent = { ...content };
        const items = content.items.slice(0, index + 1);
        items.push(newBlock);
        newContent.items = items.concat(content.items.slice(index + 1, undefined)) as Block[];

        dispatch({ id: content.id, value: newContent });
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
                className='zoom-xs-10 zoom-xl-8'
            >
                <Container>
                    <Row>
                        {blockIcons.map((item, index) => {
                            return (
                                <Col key={index}>
                                    <FLargeIconButton text={item.text} Icon={item.icon} onClick={() => add(item.blockType)}/>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </Popover>
        </>
    );
}

type RemoveBlockButtonProps = {
    index: number,
    content: BlockFeed,
    className?: string,
    style?: CSSProperties
}

/**
 * Removes the block at index in the list of children of `content`.
 * @param index Index to remove at
 * @param content ContentList containing the list from which to remove the item
 * @param className Extra classNames on the <i> tag
 * @param style Extra styling added to the <i> tag
 * @constructor
 */
function RemoveBlockButton({ index, content, className, style }: RemoveBlockButtonProps) {
    const dispatch = useContext(ContentTreeContext);

    function deleteBlock(index: number) {
        const newCOFeed = {
            ...content
        };
        const items = content.items.slice(0, index);
        newCOFeed.items = items.concat(content.items.slice(index + 1, undefined)) as Block[];

        dispatch({ id: content.id, value: newCOFeed });
    }

    return (<i
        className={'position-absolute fa fa-times-circle show-on-parent-hover ' + className ?? ''}
        onClick={() => deleteBlock(index)}
        style={style}
    />);
}

export type BlockFeedCOEProps = {
    content: BlockFeed
}

/**
 * Component rendering a BlockFeed and allows for editing behaviour. Allows for adding blocks and removing blocks.
 * @param content The BlockFeed object to render and edit.
 * @constructor
 */
export default function BlockFeedCOE({ content }: BlockFeedCOEProps) {
    return (
        <Col xs={12}>
            <Row>
                <AddBlockButton index={-1} content={content} />
            </Row>
            {content.items.map((obj, index) => {
                return (
                    <>
                        <Row className='position-relative show-children-on-hover'>
                            <RemoveBlockButton index={index} content={content}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    right: '-10px',
                                    top: '-10px'
                                }}
                            />
                            <BlockCOR block={obj} />
                        </Row>
                        <Row>
                            <AddBlockButton index={index} content={content} />
                        </Row>
                    </>
                );
            })}
        </Col>
    );
}
