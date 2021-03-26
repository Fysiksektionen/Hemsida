import React, { PropsWithChildren } from 'react';
import { ContentDict, ContentList, ContentObject } from './types/api_object_types';

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

// Empty object to initialize context. Id = 0 is  marker for undefined ContentObject.
const emptyContentObject: ContentObject = { id: 0, detailUrl: '', name: '', dbType: 'dict', attributes: {}, items: {} };

type ContentObjectTreeDispatchAction = {
    id?: number,
    value: ContentObject
};

// Context
const ContentObjectTreeContext = React.createContext<{dispatch: React.Dispatch<ContentObjectTreeDispatchAction> }>(
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        dispatch: (action: ContentObjectTreeDispatchAction) => {}
    }
);

function replaceAtId(tree: ContentObject, id: number, value: ContentObject) {
    if (tree.id === id) { // If at correct object
        return value;
    } else { // Recursive in child.
        if (tree.dbType === 'dict') { // If dict
            console.log(tree);
            const treeDict = tree as ContentDict;
            for (const [name, subTree] of Object.entries(treeDict.items)) { // Search and update all children
                if (subTree !== undefined) {
                    treeDict.items[name] = replaceAtId(subTree, id, value);
                }
            }
            console.log(treeDict);
            return treeDict;
        } else if (tree.dbType === 'list') { // If list
            const treeList = tree as ContentList;
            treeList.items = treeList.items.map((subTree) => {
                return replaceAtId(subTree, id, value);
            }); // Search and update all children
            return treeList;
        } else { // If not this item and there are no sub-items, return item.
            return value;
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
    console.log('contentObjectTreeReducer');
    console.log(state);
    console.log(action.value);
    if (action.id === undefined) { // If no id: update entire tree.
        return action.value;
    } else { // If id: find that object and replace subtree with value.
        return replaceAtId(state, action.id, action.value);
    }
}

type ContentObjectTreeProviderProps = {
    state: ContentObject
    preDispatchHook?: (action: ContentObjectTreeDispatchAction) => void,
    postDispatchHook?: (action: ContentObjectTreeDispatchAction, newState: ContentObject) => void
}

/**
 * Provider component. Used around any ContentTree component.
 * @param props JSX.Element props allowing for children. Takes `state` as initial state. If state change
 *  the context.state is updated. pre and post Hooks are run around the standard dispatch function. These are NOT run
 *  when setting initial state (aka when initialization is done or props.state is changed.)
 */
export function ContentObjectTreeProvider(props: PropsWithChildren<ContentObjectTreeProviderProps>) {
    const [state, dispatch] = React.useReducer(contentObjectTreeReducer, props.state);

    // Update entire tree if provider state is changed.
    if (state !== props.state) {
        dispatch({ value: props.state });
    }

    function wrappedDispatch(action: ContentObjectTreeDispatchAction) {
        // console.log('wrappedDispatch');
        // console.log(action);
        // console.log(props.state);
        // console.log(state);
        if (props.preDispatchHook !== undefined) {
            props.preDispatchHook(action);
        }
        dispatch(action);
        if (props.postDispatchHook !== undefined) {
            props.postDispatchHook(action, state);
        }
    }

    return (
        <ContentObjectTreeContext.Provider value={{ dispatch: wrappedDispatch }}>
            {props.children}
        </ContentObjectTreeContext.Provider>
    );
}

/**
 * Use context method. Raises error if the context is not explicitly defined above using component.
 */
export function useContentObjectTreeContext() {
    return React.useContext(ContentObjectTreeContext);
}
