/**
 * @module MyLib
 */ /** */

import BackendException from 'app/exceptions/backendException';
import 'isomorphic-fetch';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export interface IBackendRequestOptions {
    /**
     * Body string to be passed to the end-point.
     */
    body?: string;

    /**
     * REST method, e.g. `GET`.
     */
    method: string;
}

/**
 * A singleton class for accessing the backend.
 *
 * In this case as an example, this works as gateway for JSONPlaceholder
 * (https://jsonplaceholder.typicode.com). As this is a singleton and construct
 * or is private, `instance`-method provides the access to this class.
 *
 * @example
 *
 * ```javascript
 * //
 * Backend.instance.call(`posts/1`, {
 *     method: 'GET',
 * });
 * ```
 */
export default class Backend {
    /**
     * Returns common headers towards the end-point.
     *
     * @returns Object
     */
    private static getCommonHeaders(): {} {
        return {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        };
    }

    private _url: string;

    /**
     * The constructor.
     *
     * Not to be called.
     *
     * @param enforcer
     */
    public constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new SyntaxError('Cannot construct singleton');
        }
    }

    /**
     * Get an instance to this (singleton) class.
     *
     * @returns {Backend}
     */
    static get instance(): Backend {
        if (!this[singleton]) {
            this[singleton] = new Backend(singletonEnforcer);
        }

        return this[singleton];
    }

    /**
     * Set new root URL for backend end-point.
     *
     * @param url
     */
    public set url(url: string) {
        this._url = url;
    }

    /**
     * @returns {string}
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Performs a request to the end-point.
     *
     * @param path
     * @param options
     *
     * @returns {Promise<Response>}
     * @throws BackendException
     */
    public call(path: string, options: IBackendRequestOptions): Promise<Response> {
        return fetch(
            `${this._url}${path}`,
            Object.assign(
                {},
                Backend.getCommonHeaders(),
                options,
            ),
        ).then(this.processHeaders.bind(this));
    }

    /**
     * Process headers from end-point.
     *
     * @param response
     *
     * @returns {Promise<Response>}
     * @throws BackendException
     */
    private processHeaders(response: Response): Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }

        return response.json().then((o) => {
            throw new BackendException(response, o);
        });
    }
}
