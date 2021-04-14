import { CustomEditor, LIST_TYPES } from './custom_types';
import { Editor, Element as SlateElement, Transforms } from 'slate';

export const isBlockActive = (editor: CustomEditor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    });

    return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: string) => {
    const marks = Editor.marks(editor) as NodeJS.Dict<any> | null;
    if (marks !== null && format in marks) {
        return marks[format] === true;
    } else {
        return false;
    }
};

export const toggleBlock = (editor: CustomEditor, format: SlateElement['type']) => {
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

export const toggleMark = (editor: CustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};
