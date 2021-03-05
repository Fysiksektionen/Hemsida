
export function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
    /**
     * Invokes a timeout on a promise.
     * @param  {number} ms  Timeout in milliseconds.
     * @param  {PromiseLike<any>} promise  Promise to timeout.
     * @return {Promise}  New Promise. Promising the same value as input if not timing out.
     */
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error("timeout"))
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    })
}