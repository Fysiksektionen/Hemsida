import React, { useState } from 'react';
import { AdminPageProps } from '../../../types/admin_components';
import PageLister from './PageLister';
import PageEditor from './PageEditor';
import { setAddressField } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PagesAdminPage({ path, getParams }: AdminPageProps) {
    const [locationState, setLocationState] = useState(getParams);

    function setLocationHook(getParams: NodeJS.Dict<string>) {
        setLocationState(getParams);
        setAddressField({ path: 'pages/', getParams: getParams });
    }

    // Logic of loading a list or loading edit mode of a single page.
    const pageId = locationState !== undefined ? locationState.id : undefined;

    return pageId === undefined
        ? <PageLister setPagesLocation={setLocationHook}/>
        : <PageEditor setPagesLocation={setLocationHook} id={pageId} />;
};
