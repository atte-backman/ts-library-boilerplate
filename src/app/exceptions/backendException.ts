/**
 * @module MyLib
 */ /** */

/**
 * Used to express exception when something went wrong while communicated
 * with the backend.
 */
export default class BackendException extends Error {
    /**
     * @param response
     * @param data
     */
    constructor(response: Response, data: {} = {}) {
        super(JSON.stringify({
            statusText: response.statusText,
            data,
        }));
    }
}
