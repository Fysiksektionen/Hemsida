/**
 * Types that are used by multiple files throughout the project.
 */

import React from 'react';
import { Page } from './api_responses';

export type PageComponentProps = {
    data: Page
}

export type PageComponent = React.FunctionComponent<PageComponentProps>;
