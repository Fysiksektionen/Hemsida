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

type AddIdDispatchAction = {
    id?: number
};

export const ContentTreeAddIdContext = React.createContext<{ id: number, decrementHook: React.Dispatch<AddIdDispatchAction> }>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { id: -1, decrementHook: ({ id }) => {} } // Default
);

/**
 * ContentObjectTree related providers and contexts.
 * =================================================
 *
 * We have a Reducer which stores a state (ContentObject) and defines
 * a reducer
 */

type CTDispatchAction = {
    id: number,
    value: ContentObject
};

/**
 * Context delivering a dispatch method to change context object.
 */
export const ContentTreeContext = React.createContext<React.Dispatch<CTDispatchAction>>(
    () => {}
);

/**
 * Replace a sub-tree of a ContentObject-tree. Assumes unique id's.
 *
 * @param tree: The entire tree.
 * @param id: Id of the ContentObject at base of tree to be replaced.
 * @param value: The ContentObject (tree) replacing the tree starting at CO with id.
 * @returns: Object with the updated ContentObject at value and weather or not the id was found.
 */
export function replaceAtId(tree: ContentObject, id: number, value: ContentObject): {value: ContentObject, found: boolean} {
    if (tree.id === id) { // If at correct object
        return { value: value, found: true };
    } else { // Recursive in child.
        let found = false;
        if (tree.dbType === 'dict') { // If dict
            const items: NodeJS.Dict<ContentObject> = {};
            for (const [name, subTree] of Object.entries(tree.items)) { // Search and update all children
                if (!found) {
                    if (subTree !== undefined) {
                        const ret = replaceAtId(subTree, id, value);
                        found = ret.found;
                        items[name] = ret.value;
                    }
                } else {
                    items[name] = subTree;
                }
            }
            return { value: { ...tree, items: items }, found: found };
        } else if (tree.dbType === 'list') { // If list
            const treeList = tree as ContentList;
            treeList.items = treeList.items.map((subTree) => {
                if (!found) {
                    const ret = replaceAtId(subTree, id, value);
                    found = ret.found;
                    return ret.value;
                } else {
                    return subTree;
                }
            }); // Search and update all children
            return { value: treeList, found: found };
        } else { // If not this item and there are no sub-items, return item.
            return { value: tree, found: false };
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
function CTReducer(state: ContentObject, action: CTDispatchAction) {
    // Find that object and replace subtree with value.
    return replaceAtId(state, action.id, action.value).value;
}

function decrementOrResetReducer(prevState: number, action: AddIdDispatchAction) {
    if (action.id !== undefined) {
        return action.id;
    } else {
        return prevState - 1;
    }
}

type UseCTReducerProps = {
    content: ContentObject
    preDispatchHook?: (action: CTDispatchAction, oldState: ContentObject) => void,
    postDispatchHook?: (action: CTDispatchAction, newState: ContentObject) => void
}

/**
 * Wrapper of useReducer to allow for adding pre and post hooks to calling the dispatch. Pre and post
 * often used for alter and save hooks.
 *
 * Note! When props.content.id is changed (aka) the state of the Reducer is updated and current state is lost!
 * See to it that the state is saved in a place where you want it with help of the pre and post hooks.
 */
export function useCTReducer(props: UseCTReducerProps): [ContentObject, React.Dispatch<CTDispatchAction>, number, React.Dispatch<AddIdDispatchAction>] {
    const [state, dispatch] = React.useReducer(CTReducer, props.content);
    const [latestPropsId, setLatestPropsId] = useState(props.content.id); // Save latest props.id
    const [addId, decrementIdHook] = React.useReducer(decrementOrResetReducer, -1);

    // If top-level id has changed, replace entire state. (Happens when language is changed or when a new page is loaded)
    if (latestPropsId !== props.content.id) {
        dispatch({ id: latestPropsId, value: props.content });
        setLatestPropsId(props.content.id);
    }

    // Create new dispatch wrapping the real dispatch in pre and post hooks.
    function wrappedDispatch(action: CTDispatchAction) {
        if (props.preDispatchHook !== undefined) {
            props.preDispatchHook(action, state);
        }
        dispatch(action);
        if (props.postDispatchHook !== undefined) {
            props.postDispatchHook(action, state);
        }
    }

    return [state, wrappedDispatch, addId, decrementIdHook];
}
