import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

/**
 * Slate blocks
 */
export type BulletedListElement = { type: 'bulleted-list', children: Descendant[] }
export type NumberedListElement = { type: 'numbered-list', children: Descendant[] }
export type ListItemElement = { type: 'list-item'; children: Descendant[] }
export type H1Element = { type: 'h1'; children: Descendant[] }
export type H2Element = { type: 'h2'; children: Descendant[] }
export type H3Element = { type: 'h3'; children: Descendant[] }
export type H4Element = { type: 'h4'; children: Descendant[] }
export type H5Element = { type: 'h5'; children: Descendant[] }
export type LinkElement = { type: 'link'; url: string; children: Descendant[] }
export type ParagraphElement = { type: 'paragraph'; children: Descendant[] }

export type CustomElement =
  | BulletedListElement
  | NumberedListElement
  | H1Element
  | H2Element
  | H3Element
  | H4Element
  | H5Element
  | LinkElement
  | ListItemElement
  | ParagraphElement

/**
 * Slate text with marks
 */
export type CustomText = {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    code?: boolean
    text: string
}

/**
 * Slate related overrides
 */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor
declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
        Element: CustomElement
        Text: CustomText
    }
}

/**
 * Useful types, lists and maps.
 */
export type SlateBlockType = CustomElement['type'];
export type SlateMarkType = keyof Omit<CustomText, 'text'>;

export const LIST_TYPES = ['bulleted-list', 'numbered-list'];
export const EMPTY_VALUE = [{ type: 'paragraph', children: [{ text: '' }] }] as Descendant[];

export const HOTKEYS: NodeJS.Dict<SlateMarkType> = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};
