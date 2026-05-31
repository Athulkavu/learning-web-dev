import mongoose from "mongoose";
// async-await
const configureDb = async () => {
    try {
        // Await the connection to the database
        // const db=await mongoose.connect("mongodb://127.0.0.1:27017/product-db");
        // console.log("successfully connected to db",db
        // 
        
    
        await mongoose.connect("mongodb://127.0.0.1:27017/product-db");
        console.log("successfully connected to db");
        
    } catch (err) {
        // Catch any connection errors
        console.log("error connecting to the db", err.message);
    }
}
// const configureDb=()=>{
//     mongoose.connect("mongodb://127.0.0.1:27017/product-db")
//         .then(() => {
//             console.log("successfully connected to db");
//         })
//         .catch((err) => {
    
//             console.log("error connecting to the db", err.message);
//         })
// }
export default configureDb;