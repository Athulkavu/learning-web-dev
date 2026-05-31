const axios=require('axios');
const username="vivek"
//callback fns passed as an args to another fn,to be called in a later point in time
axios.get(`https://api.genderize.io?name=${username}`)
  .then(function(response){
      const {name,gender}=response.data;
      console.log(` ${name} is ${gender}`);
   })
  .catch(function(err){
      console.log(err.message);
   })