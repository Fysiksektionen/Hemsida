import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { ContentObject } from './types/api_object_types';

/**
 * Locale related types and contexts.
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
 */

export const EditorialModeContext = React.createContext<boolean>(
    false // Default
);

/**
 * ContentObjectTree related providers and contexts.
 */

type BilingualContentObject = {
    sv: ContentObject,
    en: ContentObject
}
const emptyContentObject: ContentObject = {
    id: 0,
    detailUrl: '',
    name: '',
    dbType: 'dict',
    attributes: {},
    items: {}
};

const ContentObjectTreeContext = React.createContext<{state: BilingualContentObject, dispatch: React.Dispatch<{ path: string, value: any }> }>(
    {
        state: { sv: emptyContentObject, en: emptyContentObject },
        dispatch: (action: { path: string, value: any }) => {}
    }
);
const contentObjectTreeReducer: React.Reducer<ContentObject, { path: string, value: any }> = (state, action) => {
    return state;
};

type ContentObjectTreeProviderProps = {
    initialState: ContentObject
}
export const ContentObjectTreeProvider: FunctionComponent<ContentObjectTreeProviderProps> = (props: PropsWithChildren<ContentObjectTreeProviderProps>) => {
    const [state, dispatch] = React.useReducer(contentObjectTreeReducer, props.initialState);

    const value = { state, dispatch };
    return (
        <ContentObjectTreeContext.Provider value={value}>
            {props.children}
        </ContentObjectTreeContext.Provider>
    );
};

export function useContentObjectTreeContext() {
    const context = React.useContext(ContentObjectTreeContext);
    if (context === undefined) {
        throw new Error('useContentObjectTreeContext must be used within a ContentObjectTreeProvider');
    }
    return context;
}
