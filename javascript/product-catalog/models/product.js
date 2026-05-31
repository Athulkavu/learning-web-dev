import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name should not be empty'],
        minlenght: 5
    },
    price: {
        type: Number,
        required: true,
        min: [1, "min price is 1"]
    }
}, { timestamps: true });
// create model-(fancy constructor fn)
const Product = mongoose.model('product', productSchema)
export default Product;
