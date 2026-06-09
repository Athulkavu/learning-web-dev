const errorFormatter = (errors) => {
  const result = [];
  for (let key in errors) {
    const errorObj = {
      [key]: errors[key].message
    };
    result.push(errorObj);
  }
  return result;
};

export default errorFormatter;

// function errorFormatter(error){
//     const {errors}=error;
//     const result=[];
//     for(let key in errors){
//         // computed property-dynamically creating keys from a variable;
//         const errObj={[key]:errors[key].message}
//         console.log(key);
//         result.push(errObj);
//     }
//     return result;
//     // or do this
//     // return Object.keys(error.errors).map(key => { return { [key]: error.errors[key].message }; }); 
//     // console.log(Object.keys(error.errors).map(key=>{ return {[key]:error.errors[key].message}}));
   
// }
// export default errorFormatter;

// // in commonjs 
// // module.export=errorFormatter;

