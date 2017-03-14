/**
 * @module MyLib
 */ /** */

import isEqual = require('lodash/isEqual');
import _get = require('lodash/get');
import _set = require('lodash/set');
import {IObservableEntity} from 'app/interfaces/observableEntity';

/**
 * A generic class for making model observable for data changes.
 *
 * @see {@link IObservableEntity}
 */
export default class ObservableEntityModel<T> implements IObservableEntity<T> {
    /**
     * Current set of data.
     */
    public _data: T = <any> {};

    /**
     * A map containing current changes.
     */
    public _dataChangeSet: WeakMap<this, {}>;

    /**
     * @param data
     */
    constructor(data?: T) {
        this._dataChangeSet = new WeakMap();
        this._data = data;
    }

    /**
     * Mark model (or it's property) as untainted.
     *
     * @hidden
     */
    public applyChanges(): void {
        this.dataChangeSet = {};
    }

    /**
     * @returns {Object}
     * @hidden
     */
    public get dataChangeSet(): {} {
        return this._dataChangeSet.get(this) || {};
    }

    /**
     * @param data
     * @hidden
     */
    public set dataChangeSet(data: {}) {
        this._dataChangeSet.set(this, data);
    }

    /**
     * @param name
     * @param value
     */
    protected persistProperty(name: string, value: any) {
        if (!isEqual(_get(this._data, name, null), value)) {
            _set(this._data, name, value);

            const changeSet: {} = this._dataChangeSet.get(this) || {};

            _set(changeSet, name, value);

            this._dataChangeSet.set(this, changeSet);
        }
    }
}
