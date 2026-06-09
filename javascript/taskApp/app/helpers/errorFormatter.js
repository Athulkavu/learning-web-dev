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