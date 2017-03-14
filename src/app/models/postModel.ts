/**
 * @module Post
 */ /** */

import {IPost} from 'app/interfaces/post';
import ObservableEntityModel from 'app/models/observableEntityModel';

import validateStringLength from 'app/decorators/stringLengthValidator';

/**
 * A class for post data from JSONPlaceholder.
 *
 * @see {@link IPost} for data-structure.
 */
export default class PostModel extends ObservableEntityModel<IPost> {
    /**
     * The constructor.
     *
     * Creates a new internal {@link https://developer.mozilla.org/en-US/docs/
     * Web/JavaScript/Reference/Global_Objects/WeakMap|weak map} for the data
     * changes.
     *
     * @param data Customer data object to format model with.
     */
    constructor(data: IPost = <IPost> {}) {
        super(data);
    }

    /**
     * @returns {number}
     */
    public get userId(): number {
        return this._data.userId;
    }

    /**
     * @param userId
     */
    public set userId(userId: number) {
        this.persistProperty('userId', userId);
    }

    /**
     * @returns {number}
     */
    public get id(): number {
        return this._data.id;
    }

    /**
     * @returns {string}
     */
    public get title(): string {
        return this._data.title;
    }

    /**
     * @param title
     */
    @validateStringLength(1, 128)
    public set title(title: string) {
        this.persistProperty('title', title);
    }

    /**
     * @returns {string}
     */
    public get body(): string {
        return this._data.body;
    }

    /**
     *
     * @param body
     */
    public set body(body: string) {
        this.persistProperty('body', body);
    }

    /**
     * @returns {IPost}
     */
    public get data(): IPost {
        return this._data;
    }
}
