import { Field } from './Field';
import { FieldList } from './FieldList';

export class FieldListBuilder {
    /** @param {{ [x: string]: any } | any[]} source */
    static from(source) {
        if (Array.isArray(source)) {
            throw new Error('Arrays are not supported yet');
        }

        if (!this._isPlainObject(source)) {
            throw new Error('Source should be either an array or plain object');
        }

        return new FieldList(this._fromObject(source));
    }

    static _fromArray(array, parentChain = []) {
        const fields = [];
    
        for (const [key, value] of array.entries()) {
            fields.push(
                new Field({
                    key, value, parentChain, isArrayItem: true
                })
            );
    
            if (Array.isArray(value)) {
                fields.push(
                    ...this._fromArray(value, [...parentChain, key])
                );
            }
    
            if (this._isPlainObject(value)) {
                fields.push(
                    ...this._fromObject(value, [...parentChain, key])
                );
            }
        }
    
        return fields;
    };
    
    static _fromObject(object, parentChain = []) {
        const fields = [];
    
        for (const [key, value] of Object.entries(object)) {
            fields.push(
                new Field({
                    key, value, parentChain,
                })
            );
    
            if (Array.isArray(value)) {
                fields.push(
                    ...this._fromArray(value, [...parentChain, key])
                );
            }
    
            if (this._isPlainObject(value)) {
                fields.push(
                    ...this._fromObject(value, [...parentChain, key])
                );
            }
        }
    
        return fields;
    }

    static _isPlainObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
}
