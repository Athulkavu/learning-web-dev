// const express=require('express');
import express from "express"
import cors from "cors"
import errorFormatter from "./helpers/errorFormatter.js";
import configureDb from "./config/db.js";
import Product from "./models/product.js";
const app = express();
const port = 3344;
app.use(express.json());
app.use(cors());
configureDb();
// db config in config folder
// define a schema-design /blueprint (object) written in model


app.get('/', (req, res) => {
    res.json({ "msg": "welcome to the site" });
});

// get /products->return all the products

// app.get('/products', (req, res) => {
//     Product.find()
//         .then((products) => {
//             console.log(products);
//             res.json({
//                 count: products.length,
//                 data: products
//             }
//             )
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: "something went wrong" });
//         })
// })

// app.get using async-await
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
})
// get only one document using id
// async-await
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Await the Mongoose query
        const product = await Product.findById(id);

        // Check if the record exists
        if (!product) {
            return res.status(404).json({ error: "record not found" });
        }

        // Send the successful response
        res.json(product);

    } catch (err) {
        // Handle server/database errors (e.g., CastError if the ID format is invalid)
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
});
// app.get('/products/:id', (req, res) => {
//     const id = req.params.id;
//     Product.findById(id)
//         .then((products) => {
//             if (!products) {//record not found
//                 return res.status(404).json({ error: "record not found" });
//             }
//             res.json(products);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: "something went wrong" });
//         })
// })
// delete a document
// async-await
app.delete('/products/:id', async (req, res) => {

    const { id } = req.params
    try {
        // const { id } = req.params this can be written here also but usually in try written error prone code is written
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: "record not found" })
        }
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
})
// app.delete('/products/:id', (req, res) => {
//     // const id=req.params.id;
//     const { id } = req.params
//     Product.findByIdAndDelete(id)
//         .then((products) => {
//             if (!products) {
//                 return res.status(404).json({ error: "record not found" })
//             }
//             // return res.status(203).json(); //no content 
//             res.json(products);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: "something went wrong" });
//         })
// })

// create product
app.post('/create-product', async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = new Product();
        const product = new Product({
            name: name,
            price: price
        });
        // product.name = name;
        // product.price = price;
        // Wait for the save operation to complete
        const productRecord = await product.save();
        // Send the successful response
        res.status(201).json(productRecord);
    } catch (err) {
        // Handle any errors that occurred during save() or other synchronous operations inside the try block
        res.status(400).json(errorFormatter(err));
    }
});

// app.post('/create-product', (req, res) => {
//     const { name, price } = req.body;
//     const product = new Product();
//     product.name = name;
//     product.price = price;
//     product.save()
//         .then((productRecord) => {
//             res.status(201).json(productRecord);
//         })
//         .catch((err) => {
//             res.status(400).json(errorFormatter(err));//errorFormatter coming from helper
//         })
// })

// update product
// async-await
app.put('/update-product/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    try {
        // Await the Mongoose query
        const product = await Product.findByIdAndUpdate(
            id,
            { name, price },
            { returnDocument: 'after', runValidators: true }
        );

        // Handle the case where the product isn't found
        if (!product) {
            return res.status(404).json({ error: "record not found" });
        }

        // Send the successful response
        res.json(product);

    } catch (err) {
        // Handle validation errors specifically
        if (err.name === "ValidationError") {
            const errMsg = errorFormatter(err.errors);
            return res.status(400).json(errMsg);
        }

        // Handle any other server/database errors
        // console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
});
// app.put('/update-product/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, price } = req.body;
//     Product.findByIdAndUpdate(id, { name, price }, { returnDocument:'after', runValidators: true })//new: true  depritoared use returnDocument:'after'
//         .then((product) => {
//             if (!product) {
//                 return res.status(404).json({ errror: "record not found" })
//             }
//             res.json(product)
//         })
//         .catch((err) => {
//             // const errMsg=errorFormatter(err.errors);
//             // res.status(400).json(errMsg);
//             // the above is only for validation error so we need to handle it if error is not validation we neet to check for other errors also so write inside if
//             if (err.name == "validationError") {
//                 const errMsg = errorFormatter(err.errors);
//                 return res.status(400).json(errMsg);
//             }
//             // console.log(err);
//             res.status(500).json({ error: "something went wrong" })
//         })

// })



app.listen(port, () => {
    console.log(`server is running http://localhost:${3344}`);
})

