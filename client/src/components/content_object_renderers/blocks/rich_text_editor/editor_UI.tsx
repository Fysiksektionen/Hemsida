import React, { HTMLAttributes, Ref, PropsWithChildren } from 'react';
import {
    Element as SlateElement,
    Text as SlateText
} from 'slate';
import { useSlate } from 'slate-react';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './block_mark_utils';
import { cx, css } from '@emotion/css';
import { BlockTypes, MarkTypes } from './custom_types';

export const Element = ({ attributes, children, element }: { attributes: HTMLAttributes<HTMLElement>, children: JSX.Element, element: SlateElement }) => {
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

export const Leaf = ({ attributes, children, leaf }: { attributes: HTMLAttributes<HTMLElement>, children: JSX.Element, leaf: SlateText }) => {
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

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(
    (
        {
            className,
            active,
            reversed,
            ...props
        }: PropsWithChildren<
            {
                active: boolean
                reversed: boolean
            } & BaseProps
            >,
        ref?: Ref<HTMLDivElement>
    ) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          cursor: pointer;
          color: ${reversed
            ? active
                ? 'white'
                : '#aaa'
            : active
                ? 'black'
                : '#ccc'};
        `
            )}
        />
    )
);

export const BlockButton = ({ format, icon }: { format: BlockTypes, icon?: JSX.Element }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

export const MarkButton = ({ format, icon }: { format: MarkTypes, icon?: JSX.Element }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon || <i className='fa fa-question' />}
        </Button>
    );
};

interface BaseProps {
    className: string
    [key: string]: unknown
}

// eslint-disable-next-line react/display-name
export const Menu = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref?: Ref<HTMLDivElement>
    ) => (
        <div
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
            )}
        />
    )
);

// eslint-disable-next-line react/display-name
export const Toolbar = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref?: Ref<HTMLDivElement>
    ) => (
        <Menu
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
            )}
        />
    )
);
