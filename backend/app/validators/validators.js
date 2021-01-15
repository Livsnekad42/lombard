const errorsCode = require("../config/_error_type");

module.exports = (class Validator {
    /**
     *
     * @param fields: Array<{
     *                  field: string, 
     *                  required: boolean, 
     *                  type: Object | type, 
     *                  validFunc: Function(any): boolean
     *                }>
     * @returns: Validator
     */
    constructor(fields) {
        this.fields = fields;
        this.errors = null;
    }

    isValid(data) {
        const errors = [];

        for ( const field of this.fields ) {
            const dataValidated = {};
            const fieldName = field.field;

            if ( !data[fieldName] ) {
                if ( field.required ) {
                    dataValidated[fieldName] = "Поле не может быть пустым.";
                }
            } else {
                const typing = !!field.validFunc ? 
                    field.validFunc :
                    field.type;

                if ( !this.isValidType(data[fieldName], typing) ) {
                    dataValidated[fieldName] = "Невалидные данные.";
                }
            }

            if ( !!dataValidated[fieldName] ) {
                errors.push(dataValidated);
            }
        }
        if ( errors.length > 0 ) {
            this.errors = errors;
            return false;
        }
        return true;
    }

    call(response, data) {
        if ( !this.isValid(data) ) {
            response.status(400).json({
                code: errorsCode.no_valid,
                errors: this.errors,
            });
            return false;
        }
        return true;
    }

    isValidType(value, typing) {
        if ( !typing ) return true;

        if ( typeof typing === "function" ) {
            return typing(value);
        }

        switch ( typing ) {
            case "object":
                return value instanceof typing;

            case "number":
                return !isNaN(+value);
        }
        return typeof value === typing;
    }
});