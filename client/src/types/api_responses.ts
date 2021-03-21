import { ContentDict } from './api_object_types';

/**
 * File defining full responses of each api call.
 */

export type APIResponse<T> = {
    code: number, // Status code
    data: T // Data of the response
}

export type SiteResponseData = {
    headerContentSv: ContentDict,
    headerContentEn: ContentDict,
    footerContentSv: ContentDict,
    footerContentEn: ContentDict
}

export type SiteResponse = APIResponse<SiteResponseData>
