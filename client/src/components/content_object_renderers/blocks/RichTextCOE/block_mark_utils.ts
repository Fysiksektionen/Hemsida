import { CustomEditor, LIST_TYPES, SlateBlockType, SlateMarkType } from './slate_types';
import { Editor, Element as SlateElement, Transforms } from 'slate';

/**
 * Check if the cursor is currently inside the given block.
 * @param editor The slate editor
 * @param format The block type to check for
 */
export const isBlockActive = (editor: CustomEditor, format: SlateBlockType) => {
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    });
    return !!match;
};

/**
 * Check if the cursor is currently inside the given mark.
 * @param editor The slate editor
 * @param format The mark type to check for
 */
export const isMarkActive = (editor: CustomEditor, format: SlateMarkType) => {
    const marks = Editor.marks(editor) as NodeJS.Dict<any> | null;
    if (marks !== null && format in marks) {
        return marks[format] === true;
    } else {
        return false;
    }
};

/**
 * Toggles a block in the current selection.
 * @param editor The slate editor
 * @param format The block type to toggle
 */
export const toggleBlock = (editor: CustomEditor, format: SlateBlockType) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type).toString()
            ),
        split: true
    });
    const newProperties: Partial<SlateElement> = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] } as SlateElement;
        Transforms.wrapNodes(editor, block);
    }
};

/**
 * Toggles a mark in the current selection.
 * @param editor The slate editor
 * @param format The mark type to toggle
 */
export const toggleMark = (editor: CustomEditor, format: SlateMarkType) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

/**
 * Inserts a break-line at editor position.
 * @param editor The slate editor
 */
export const insertBreak = (editor: CustomEditor) => {
    Editor.insertBreak(editor);
};
