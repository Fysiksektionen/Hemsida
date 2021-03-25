/**
 * Types that are used by multiple files throughout the project.
 */

import React from 'react';
import { Page } from './api_object_types';

export type PageComponentProps = Page

export type PageComponent = React.FunctionComponent<PageComponentProps>;

// TODO: Change object to content object
export type COStateUpdateHook = (arg: object) => void

export type APIResponse<T> = {
    code: number, // Status code
    data: T // Data of the response
}
