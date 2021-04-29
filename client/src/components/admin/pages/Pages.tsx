import React from 'react';
import { AdminPage, AdminPageProps } from '../../../types/admin_components';
import PageLister from './PageLister';
import PageEditor from './PageEditor';

/**
 * AminPage component responsible for editing of Pages.
 * @param props Standard props of an AdminPage
 */
const PagesAdminPage: AdminPage = (props: AdminPageProps) => {
    // Logic of loading a list or loading edit mode of a single page.
    const pageId = props.getParams !== undefined ? props.getParams.id : undefined;

    return pageId === undefined
        ? <PageLister setLocationHook={props.setLocationHook}/>
        : <PageEditor setLocationHook={props.setLocationHook} id={pageId} />;
};

export default PagesAdminPage;
