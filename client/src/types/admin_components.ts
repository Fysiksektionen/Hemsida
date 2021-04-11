/**
 * Types that are used by multiple files throughout the admin console.
 */
import React from 'react';

export type AdminPageProps = {
    path: string,
    getParams?: NodeJS.Dict<string|number|undefined>
}

export type AdminPage = React.FunctionComponent<AdminPageProps>;
