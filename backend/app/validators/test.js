const Validator = require("./validators");

function test() {
    data = {
        name: "field1",
        age: 45,
        data: "date"
    }

    const validFields = [
        {
            field: "name", 
            required: true, 
            type: "string", 
        },
        {
            field: "age", 
            required: true, 
            validFunc: (value) => {return value < 50}
        },
        {
            field: "data", 
            required: true, 
            type: "number"
        },     
        {
            field: "desc",
            required: true, 
            type: "string",
        }
    ];

    const validator = new Validator(validFields);

    const [isValid, errors] = validator.isValid(data);

    console.log("isValid: ", isValid);
    console.log("errors: ", errors);
}

test();