import { getGETParamsStringFromObject } from './utils';

type CallApiProps = {
    path: string,
    getParams: NodeJS.Dict<string|number|undefined>
}

const apiRootUrl = 'http://f.kth.se/api/';
const callDelay = 2000; // ms

export default function callApi({ path, getParams }: CallApiProps) {
    const getParamsString = getGETParamsStringFromObject(getParams);
    const fullPath = apiRootUrl + path + getParamsString;

    console.log('Calling api: ' + fullPath);
    setTimeout(() => {
        console.log('Got answer!');
    }, callDelay);
};
