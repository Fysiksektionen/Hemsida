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
