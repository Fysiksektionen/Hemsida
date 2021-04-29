/**
 * Types that are used by multiple files throughout the project.
 */

import React from 'react';
import { ContentObject } from './api_object_types';

export type ChangeKeyType<T, K extends keyof T, U> = Omit<T, K> & { [k in K]: U };

export type PageComponent = React.FunctionComponent<ContentObject>;

// TODO: Change object to content object
export type COStateUpdateHook = (arg: object) => void

export type APIResponse<T> = {
    code: number, // Status code
    data: T // Data of the response
}
