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
