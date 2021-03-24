import { getGETParamsStringFromObject } from './utils';
import { APIResponse, Site } from '../types/api_responses';

type CallApiProps = {
    path: string,
    getParams: NodeJS.Dict<string|number|undefined>
}

const apiRootUrl = 'http://f.kth.se/api/';
const callDelay = 1000; // ms

const mockSiteResponse: APIResponse<Site> = {
    code: 200,
    data: {
        rootUrl: 'https://f.kth.se/',
        rootPage: {
            id: 1,
            detailUrl: 'https://f.kth.se/api/pages/1/',
            name: 'Hem'
        },
        bannerContentSv: {},
        bannerContentEn: {},
        footerContentSv: {},
        footerContentEn: {}
    }
};

const apiPathToResp: NodeJS.Dict<{contentType: any, response: APIResponse<any>}> = {
    'site/': {
        contentType: (typeof mockSiteResponse),
        response: mockSiteResponse
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
