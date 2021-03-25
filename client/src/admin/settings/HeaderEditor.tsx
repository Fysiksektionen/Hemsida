import React from 'react';
import { EditorialModeContext } from '../../contexts';
import Header from '../../components/Header';

// TODO: Replace with contentObject types
export type HeaderEditorProps = {
    headerContent: {sv: object, en: object}
    updateHeaderContentStateHook: (args: {sv: object, en: object}) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeaderEditor({ headerContent, updateHeaderContentStateHook }: HeaderEditorProps) {
    return (
        <EditorialModeContext.Provider value={true}>
            <div className="border border-dark">
                <Header setLocale={(locale: any) => {}} contentSv={{}} contentEn={{}}/>
            </div>
        </EditorialModeContext.Provider>
    );
};
