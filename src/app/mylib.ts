/**
 * Example library for TypeScript with TSLint, ESLint, Gulp, Karma, Jasmine, Babel and Webpack.
 *
 * @module MyLib
 * @preferred
 */ /** */

import Backend from 'app/backend';
import PostService from 'app/services/postService';

/**
 * The main access point to the library.
 *
 * @example
 *
 * ```javascript
 * //
 * let client = new MyLib.api.Client('http://UBUNTU:1337');
 * let posts = new MyLib.api.PostService();
 *
 * posts.getById(1).then(post => {
 *     console.info(post);
 * });
 * ```
 */
export class MyLib {
    /**
     * @param path The path for end-point.
     */
    constructor(path: string = 'https://jsonplaceholder.typicode.com') {
        Backend.instance.url = path;
    }
}

// Expose the API.

export {
    MyLib as Client,
    PostService,
}
