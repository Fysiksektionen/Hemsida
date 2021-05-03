/**
 * Mock data for https://f.kth.se/api/pages/ and https://f.kth.se/api/pages/id/.
 * Used in App.tsx and admin/content_trees/Pages.tsx.
 */

import { APIResponse } from '../../types/general';
import { Page } from '../../types/api_object_types';
import { frontpage } from './1_frontpage';
import { styret } from './2_styret';
import { newsFeed } from './3_news_feed';
import { fcomPage } from './5_fcom';
import { representativesPage } from '../mock_RepresentativesPage';

export const mockPageResp: APIResponse<Page[]> = {
    code: 200,
    data: [
        frontpage,
        styret,
        newsFeed,
        fcomPage,
        representativesPage
    ]
};
