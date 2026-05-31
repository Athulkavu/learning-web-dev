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
export default errorFormatter;

// in commonjs 
// module.export=errorFormatter;