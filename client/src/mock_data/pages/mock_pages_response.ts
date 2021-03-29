/**
 * Mock data for https://f.kth.se/api/pages/ and https://f.kth.se/api/pages/id/.
 * Used in App.tsx and admin/pages/Pages.tsx.
 */

import { APIResponse } from '../../types/general';
import { Page } from '../../types/api_object_types';
import { frontpage } from './1_frontpage';
import { styret } from './2_styret';
import { newsFeed } from './3_news_feed';

export const mockPageResp: APIResponse<Page[]> = {
    code: 200,
    data: [
        frontpage,
        styret,
        newsFeed
    ]
};
