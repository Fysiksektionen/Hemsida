import React, { useState } from 'react';
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
    id: number,
    value: ContentObject
};

/**
 * Context delivering a dispatch method to change context object.
 */
export const ContentTreeContext = React.createContext<React.Dispatch<ContentObjectTreeDispatchAction>>(
    () => {}
);

/**
 * Replace a sub-tree of a ContentObject-tree.
 *
 * @param tree: The entire tree.
 * @param id: Id of the ContentObject at base of tree to be replaced.
 * @param value: The ContentObject (tree) replacing the tree starting at CO with id.
 */
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
    // Find that object and replace subtree with value.
    return replaceAtId(state, action.id, action.value);
}

type ContentObjectTreeProviderProps = {
    content: ContentObject
    preDispatchHook?: (action: ContentObjectTreeDispatchAction) => void,
    postDispatchHook?: (action: ContentObjectTreeDispatchAction, newState: ContentObject) => void
}

/**
 * Wrapper of useReducer to allow for adding pre and post hooks to calling the dispatch. Pre and post
 * often used for alter and save hooks.
 *
 * Note! When props.content.id is changed (aka) the state of the Reducer is updated and current state is lost!
 * See to it that the state is saved in a place where you want it with help of the pre and post hooks.
 */
export function useCTReducer(props: ContentObjectTreeProviderProps): [ContentObject, React.Dispatch<ContentObjectTreeDispatchAction>] {
    const [state, dispatch] = React.useReducer(contentObjectTreeReducer, props.content);
    const [latestPropsId, setLatestPropsId] = useState(props.content.id); // Save latest props.id

    // If top-level id has changed, replace entire state. (Happens when language is changed or when a new page is loaded)
    if (latestPropsId !== props.content.id) {
        dispatch({ id: latestPropsId, value: props.content });
        setLatestPropsId(props.content.id);
    }

    // Create new dispatch wrapping the real dispatch in pre and post hooks.
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
