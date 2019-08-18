import { FieldType } from './FieldType';

export class ObjectBuilder {
    /** @param {import('./FieldList').FieldList} fieldList */
    static fromFieldList(fieldList) {
        const result = {};

        for (const field of fieldList.fields) {
            console.log(`[${[...field.parentChain, field.key].join('.')}: ${field.value === undefined ? 'none': field.value} (${field.type}, item: ${field.isArrayItem})]`)
        }

        for (const field of fieldList.fields) {
            let parent = result;

            for (const [i, parentKey] of field.parentChain.entries()) {
                if (parent[parentKey] === undefined) {
                    if (i === field.parentChain.length - 1) {
                        parent[parentKey] = field.type === FieldType.ARRAY ? [] : {};
                    } else {
                        parent[parentKey] = {};
                    }
                }

                parent = parent[parentKey];
            }

            const value = field.type === FieldType.ARRAY
                ? []
                : field.type === FieldType.OBJECT
                    ? {}
                    : field.value;

            parent[field.key] = value;
        }

        return result;
    }
}
