/**
 * Types that are used by multiple files throughout the admin console.
 */
import React from 'react';

export type AdminPageProps = {
    path: string,
    getParams: object
}

export type AdminPage = React.FunctionComponent<AdminPageProps>;
