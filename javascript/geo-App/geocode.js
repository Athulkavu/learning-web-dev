const axios=require('axios');
const address="kempegowda international airport,bangalore rural,karnataka";
const geoApiKey=process.env.GEO_API_KEY;
axios.get(`https://geocode.maps.co/search?q=${address}&api_key=${GEO_API_KEY}`)
    .then(function(response){
        const {lat,lon}=response.data[0];
        const {"name:ml": malayalamName,short_name}=response.data[0].namedetails;
        console.log(`for ${address} latitude is ${lat},longitude is ${lon}`);
        console.log(`${malayalamName}${short_name}`);
    })
    .catch(function(err){
      console.log(err.message);
    })
    .finally(function(){
        console.log("hi");
    })