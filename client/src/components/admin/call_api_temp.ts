import { getGETParamsStringFromObject } from './utils';
import { APIResponse } from '../../types/general';
import { mockSiteResp } from '../../mock_data/mock_site_response';

/**
 * This file is just a placeholder to a real APIMethod.
 */

type CallApiProps = {
    path: string,
    getParams: NodeJS.Dict<string|number|undefined>
}

const apiRootUrl = 'http://f.kth.se/api/';
const callDelay = 1000; // ms

const apiPathToResp: NodeJS.Dict<{contentType: any, response: APIResponse<any>}> = {
    'site/': {
        contentType: (typeof mockSiteResp),
        response: mockSiteResp
    }
};

/**
 * Returns a static predefined value in apiPathToResp given a n api-path.
 * @param path: Path relative to api-root to call
 * @param getParams: Dict containing GET-args for the call.
 */
export default function callApi({ path, getParams }: CallApiProps) {
    const getParamsString = getGETParamsStringFromObject(getParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fullPath = apiRootUrl + path + getParamsString;

    const respDef = apiPathToResp[path];
    let resp = {};
    if (respDef !== undefined) {
        resp = respDef.response as APIResponse<typeof respDef.contentType>;
    } else {
        resp = { code: 404, data: {} };
    }

    setTimeout(() => {}, callDelay);

    return resp;
};
