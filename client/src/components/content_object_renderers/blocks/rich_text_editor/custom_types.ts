import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type BulletedListElement = {
  type: 'bulleted-list'
  children: Descendant[]
}

export type NumberedListElement = {
    type: 'numbered-list'
    children: Descendant[]
}

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

export type CustomText = {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    code?: boolean
    text: string
}

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText | EmptyText
  }
}

export type BlockTypes = CustomElement['type']
export type MarkTypes = keyof Omit<CustomText, 'text'>

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const EMPTY_VALUE = [
    {
        type: 'paragraph',
        children: [{ text: '' }]
    }
] as Descendant[];

export const HOTKEYS: NodeJS.Dict<string> = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};
