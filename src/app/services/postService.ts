/**
 * @module Post
 * @preferred
 */ /** */

import Backend from 'app/backend';
import {IPost} from 'app/interfaces/post';
import PostModel from 'app/models/postModel';

/**
 * Service interface for post service.
 *
 * @example
 *
 * ```javascript
 * //
 * const service = new mylib.api.PostService();
 *
 * service.getById(1).then(post => {
 *     console.info(post);
 * }):
 * ```
 */
export default class PostService {
    private readonly _url: string = '/posts';

    /**
     * @param id ID of the post to be fetched.
     * @returns {Promise<IPost>}
     */
    public getById(id: number): Promise<IPost> {
        return Backend.instance.call(`${this._url}/${id}`, {
            method: 'GET',
        }).then((response: Response) => {
            return <Promise<IPost>> response.json();
        }).then((postData: IPost) => {
            return new PostModel(postData);
        });
    }

    /**
     * Persist post's data changes to backend.
     *
     * @param post
     * @returns {Promise<PostModel>}
     */
    public persist(post: PostModel): Promise<PostModel> {
        // @TODO Add typings for `Object.entries`.
        if ((<any> Object).entries(post.dataChangeSet).length < 1) {
            // Do nothing if there is no actual data changes.
            return Promise.resolve(post);
        }

        return Backend.instance.call(`${this._url}/${post.id}`, {
            body: JSON.stringify(post.dataChangeSet),
            method: 'PATCH',
        }).then(() => {
            post.applyChanges(); // Reset the state.

            return post;
        });
    }
}
