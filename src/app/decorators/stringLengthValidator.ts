/**
 * @module MyLib
 */ /** */

import InvalidParameterException from 'app/exceptions/invalidParameterException';

/**
 * @param minLength
 * @param maxLength
 */
export default function validateStringLength(minLength?: number, maxLength?: number) {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<string>) {
        const set = descriptor.set;

        // tslint:disable-next-line:only-arrow-functions
        descriptor.set = function(value: string) {
            if ((minLength && value.length < minLength) || (maxLength && value.length > maxLength)) {
                throw new InvalidParameterException('Incorrect string length', propertyKey, value);
            }

            set.call(this, value);
        };
    };
}
