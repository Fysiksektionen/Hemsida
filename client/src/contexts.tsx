import React from 'react';
import { ContentList, ContentObject } from './types/api_object_types';

/**
 * Locale related types and contexts.
 * ==================================
 */

export type Locale = {
    id: string,
    name: string
}

export const locales: {[key: string]: Locale} = {
    sv: {
        id: 'sv',
        name: 'Svenska'
    },
    en: {
        id: 'en',
        name: 'English'
    }
};

export const LocaleContext = React.createContext<Locale>(
    locales.sv // Default
);

/**
 * Admin and editing related contexts.
 * ===================================
 */

export const EditorialModeContext = React.createContext<boolean>(
    false // Default
);

/**
 * ContentObjectTree related providers and contexts.
 * =================================================
 *
 * We have a Reducer which stores a state (ContentObject) and defines
 * a reducer
 */

type ContentObjectTreeDispatchAction = {
    id?: number,
    value: ContentObject
};

// Context
export const ContentObjectTreeContext = React.createContext<React.Dispatch<ContentObjectTreeDispatchAction>>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (action: ContentObjectTreeDispatchAction) => {}
);

export function replaceAtId(tree: ContentObject, id: number, value: ContentObject) {
    if (tree.id === id) { // If at correct object
        return value;
    } else { // Recursive in child.
        if (tree.dbType === 'dict') { // If dict
            const items: NodeJS.Dict<ContentObject> = {};
            for (const [name, subTree] of Object.entries(tree.items)) { // Search and update all children
                if (subTree !== undefined) {
                    items[name] = replaceAtId(subTree, id, value);
                }
            }
            return { ...tree, items: items };
        } else if (tree.dbType === 'list') { // If list
            const treeList = tree as ContentList;
            treeList.items = treeList.items.map((subTree) => {
                return replaceAtId(subTree, id, value);
            }); // Search and update all children
            return treeList;
        } else { // If not this item and there are no sub-items, return item.
            return tree;
        }
    }
}

/**
 * Reducer (aka. hook to update state) Can be accessed by any component under context.
 *
 * @param state: ContentObject that is the current state.
 * @param action: Action definition defining hoiw to update state.
 * @returns: New state
 */
function contentObjectTreeReducer(state: ContentObject, action: ContentObjectTreeDispatchAction) {
    if (action.id === undefined) { // If no id: update entire tree.
        return action.value;
    } else { // If id: find that object and replace subtree with value.
        return replaceAtId(state, action.id, action.value);
    }
}

type ContentObjectTreeProviderProps = {
    content: ContentObject
    preDispatchHook?: (action: ContentObjectTreeDispatchAction) => void,
    postDispatchHook?: (action: ContentObjectTreeDispatchAction, newState: ContentObject) => void
}

export function useContentTreeReducer(props: ContentObjectTreeProviderProps): [ContentObject, React.Dispatch<ContentObjectTreeDispatchAction>] {
    const [state, dispatch] = React.useReducer(contentObjectTreeReducer, props.content);

    if (state.id !== props.content.id) {
        dispatch({ value: props.content });
    }

    function wrappedDispatch(action: ContentObjectTreeDispatchAction) {
        if (props.preDispatchHook !== undefined) {
            props.preDispatchHook(action);
        }
        dispatch(action);
        if (props.postDispatchHook !== undefined) {
            props.postDispatchHook(action, state);
        }
    }

    return [state, wrappedDispatch];
}

/**
 * Use context method. Raises error if the context is not explicitly defined above using component.
 */
export function useContentObjectTreeContext() {
    return React.useContext(ContentObjectTreeContext);
}
