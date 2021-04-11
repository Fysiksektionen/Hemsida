/**
 * Types that are used by multiple files throughout the admin console.
 */
import React from 'react';

export type AdminLocation = {
    path: string,
    getParams: NodeJS.Dict<string>
}

export type AdminPageProps = AdminLocation & {
    setLocationHook: (props: AdminLocation) => void
}

export type AdminPage = React.FunctionComponent<AdminPageProps>;
