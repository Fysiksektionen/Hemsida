import React, { HTMLAttributes } from 'react';
import { Element as SlateElement, Text as SlateText } from 'slate';
import { useSlate } from 'slate-react';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './block_mark_utils';
import { SlateBlockType, SlateMarkType } from './slate_types';
import { Row } from 'react-bootstrap';

export const Element = ({ attributes, children, element }: { attributes: HTMLAttributes<HTMLElement>, children?: JSX.Element, element: SlateElement }) => {
    switch (element.type) {
    case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
    case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
    case 'list-item':
        return <li {...attributes}>{children}</li>;
    case 'h1':
        return <h1 {...attributes}>{children}</h1>;
    case 'h2':
        return <h2 {...attributes}>{children}</h2>;
    case 'h3':
        return <h3 {...attributes}>{children}</h3>;
    case 'h4':
        return <h4 {...attributes}>{children}</h4>;
    case 'h5':
        return <h5 {...attributes}>{children}</h5>;
    default:
        return <p {...attributes}>{children}</p>;
    }
};

export const Leaf = ({ attributes, children, leaf }: { attributes: HTMLAttributes<HTMLElement>, children?: JSX.Element, leaf: SlateText }) => {
    if ('bold' in leaf && leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if ('italic' in leaf && leaf.italic) {
        children = <i>{children}</i>;
    }

    if ('underline' in leaf && leaf.underline) {
        children = <u>{children}</u>;
    }

    if ('code' in leaf && leaf.code) {
        children = <code>{children}</code>;
    }

    return <span {...attributes}>{children}</span>;
};

function ToolbarButton({ icon, active, onClickAction } : {icon?: JSX.Element, active: boolean, onClickAction: () => void}) {
    return (
        <span
            onMouseDown={(event) => {
                onClickAction();
                event.preventDefault();
            }}
            className={'pointer-cursor' + (active ? ' text-dark' : ' text-F-medium-gray')}
        >
            {icon}
        </span>
    );
}

export const BlockButton = ({ format, icon }: { format: SlateBlockType, icon?: JSX.Element }) => {
    const editor = useSlate();

    return (
        <ToolbarButton
            icon={icon}
            active={isBlockActive(editor, format)}
            onClickAction={() => toggleBlock(editor, format)}
        />
    );
};

export const MarkButton = ({ format, icon }: { format: SlateMarkType, icon?: JSX.Element }) => {
    const editor = useSlate();

    return (
        <ToolbarButton
            icon={icon}
            active={isMarkActive(editor, format)}
            onClickAction={() => toggleMark(editor, format)}
        />
    );
};

const markFormatIconDict: NodeJS.Dict<JSX.Element> = {
    bold: <i className={'fas fa-bold'} />,
    italic: <i className={'fas fa-italic'} />,
    underline: <i className={'fas fa-underline'} style={{ verticalAlign: '-10%' }} />,
    code: <i className={'fas fa-code'} />
};
const blockFormatIconDict: NodeJS.Dict<JSX.Element> = {
    'numbered-list': <i className={'fas fa-list-ol'} />,
    'bulleted-list': <i className={'fas fa-list-ul'} />,
    h1: <span className='font-weight-bolder'>H1</span>,
    h2: <span className='font-weight-bolder'>H2</span>,
    h3: <span className='font-weight-bolder'>H3</span>,
    h4: <span className='font-weight-bolder'>H4</span>,
    h5: <span className='font-weight-bolder'>H5</span>
};

type ToolbarProps = {
    show: boolean
    markActions: SlateMarkType[],
    blockActions: SlateBlockType[]
}

export function ToolbarRow(props: ToolbarProps) {
    return (
        <Row
            className={
                'position-relative mb-2' +
                (!props.show ? ' d-none' : '')
            }
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.preventDefault()}
        >
            {props.markActions.map((markFormat, index) => {
                return (
                    <span className='mr-3' key={index}>
                        <MarkButton format={markFormat} icon={markFormatIconDict[markFormat]} />
                    </span>
                );
            })}
            {
                (props.markActions.length !== 0 && props.blockActions.length !== 0) &&
                    <i className='mr-3' style={{ color: '#ccc' }}>|</i>
            }
            {props.blockActions.map((blockFormat, index) => {
                return (
                    <span className='mr-3' key={index}>
                        <BlockButton format={blockFormat} icon={blockFormatIconDict[blockFormat]} />
                    </span>
                );
            })}
        </Row>
    );
}
