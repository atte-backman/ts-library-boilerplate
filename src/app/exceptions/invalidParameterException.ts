/**
 * @module MyLib
 */ /** */

/**
 * Used when there was something wrong with the given parameter.
 */
export default class InvalidParameterException extends Error {
    /**
     * @param message
     * @param param Name of the parameter.
     * @param value Value of the parameter.
     */
    constructor(message: string = 'Invalid parameter value', param: string = '?', value: any = '?') {
        super(`${message} (${param}=${value})`);
    }
}
