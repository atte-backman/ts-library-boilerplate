/**
 * @module MyLib
 */ /** */

/**
 * Defines generic interface of observable entity for data changes.
 */
export interface IObservableEntity<T> {
    /**
     * Current set of data.
     */
    _data: T;

    /**
     * Weak map containing modified data of the entity.
     */
    _dataChangeSet: WeakMap<{}, {}>;
}
