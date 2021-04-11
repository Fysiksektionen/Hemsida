export const adminRootPath = '/admin/';

/**
 * Function creating search string from 1-lvl (not nested) object.
 * @param getParamsObj: Non-nested object with GET-params.
 * @returns: The string in the same format as in location.search.
 */
export function getGETParamsStringFromObject(getParamsObj?: NodeJS.Dict<string|number|undefined>): string {
    const getParamsList = [];
    if (getParamsObj === undefined) {
        getParamsObj = {};
    }

    for (const [key, value] of Object.entries(getParamsObj)) {
        if (value === undefined) {
            getParamsList.push(key);
        } else {
            getParamsList.push(key + '=' + value?.toString());
        }
    }
    if (getParamsList.length > 0) {
        return '?' + getParamsList.join('&');
    } else {
        return '';
    }
}

/**
 * Function that parses the search string of the path and GET-parameters to desired format. You probably want to pass in
 * window.location.search as the searchString argument.
 * TODO Probably possible to use some inbuilt functions to do this with fewer steps
 * @param searchString The get parameters given in path by the search parameter.
 * @return Returns a dict representing the values in the get queries.
 */
export function GETParamsToDict(searchString: string): NodeJS.Dict<string | undefined> {
    // Remove leading ?
    if (searchString.length > 0 && searchString[0] === '?') {
        searchString = searchString.substring(1);
    }
    // Split over different args
    const splitArgs = searchString.split('&');

    // For each element, if it has value, use that. Else just set the key with undefined.
    const getParamsReturn: NodeJS.Dict<string | undefined> = {};
    splitArgs.forEach((item) => {
        if (item.includes('=')) {
            const [key, val] = item.split('=', 1);
            getParamsReturn[key] = val;
        } else if (item !== '') {
            getParamsReturn[item] = undefined;
        }
    });

    return getParamsReturn;
}

/**
 * Hook to set the state of the component, and also update the address field in the browser accordingly.
 * @param path: Path relative to adminRootPath to display and set.
 * @param getParams: Object to translate into GET-parameters in the URL-field.
 */
export function setAddressField({ path, getParams }: {path: string, getParams: NodeJS.Dict<string|undefined>}) {
    const getParamsString = getGETParamsStringFromObject(getParams);
    const fullUrl = window.location.origin + adminRootPath + path;
    window.history.replaceState(
        window.history.state?.data,
        window.history.state?.title,
        fullUrl + getParamsString
    );
}
