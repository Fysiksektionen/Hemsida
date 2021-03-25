import { getGETParamsStringFromObject } from './utils';
import { APIResponse } from '../types/general';
import { mockSiteResp } from '../mock_data/mock_site_response';

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

export default function callApi({ path, getParams }: CallApiProps) {
    const getParamsString = getGETParamsStringFromObject(getParams);
    const fullPath = apiRootUrl + path + getParamsString;

    const respDef = apiPathToResp[path];
    let resp = {};
    if (respDef !== undefined) {
        resp = respDef.response as APIResponse<typeof respDef.contentType>;
    } else {
        resp = { code: 404, data: {} };
    }

    console.log('Calling api: ' + fullPath);
    setTimeout(() => {
        console.log('Got answer: ');
        console.log(resp);
    }, callDelay);

    return resp;
};
