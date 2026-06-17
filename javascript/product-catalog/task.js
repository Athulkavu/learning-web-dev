function errorFormatter(error){
    const {errors}=error;
    const result=[];
    for(let key in errors){
        // computed property-dynamically creating keys from a variable;
        const errObj={[key]:errors[key].message}
        console.log(key);
        result.push(errObj);
    }
    return result;
    // or do this
    // return Object.keys(error.errors).map(key => { return { [key]: error.errors[key].message }; }); 
    // console.log(Object.keys(error.errors).map(key=>{ return {[key]:error.errors[key].message}}));
   
}

const error = {
    "errors": {
        "name": {
            "name": "ValidatorError",
            "message": "name should not be empty",
            "properties": {
                "message": "name should not be empty",
                "type": "required",
                "path": "name",
                "value": "",
                "length": 0
            },
            "kind": "required",
            "path": "name",
            "value": ""
        },
        "price": {
            "name": "ValidatorError",
            "message": "price is required",
            "properties": {
                "message": "price is required",
                "type": "required",
                "path": "price",
                "value": null
            },
            "kind": "required",
            "path": "price",
            "value": null
        }
    },
    "_message": "Product validation failed",
    "name": "ValidationError",
    "message": "Product validation failed: name: name should not be empty, price: price is required"
}

console.log(errorFormatter(error)); // output should be this [ { name: "name should not be empty"}, { price: "price is required"} ]

