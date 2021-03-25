import React from 'react';
import { EditorialModeContext } from '../../contexts';
import Header from '../../components/Header';
import { SiteHeaderContentTree } from '../../types/constent_object_trees';

// TODO: Replace with contentObject types
export type HeaderEditorProps = {
    headerContent: {sv: SiteHeaderContentTree, en: SiteHeaderContentTree}
    updateHeaderContentStateHook: (args: {sv: SiteHeaderContentTree, en: SiteHeaderContentTree}) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeaderEditor({ headerContent, updateHeaderContentStateHook }: HeaderEditorProps) {
    return (
        <EditorialModeContext.Provider value={true}>
            <div className="border border-dark col">
                <Header contentSv={headerContent.sv} contentEn={headerContent.en}/>
            </div>
        </EditorialModeContext.Provider>
    );
};
