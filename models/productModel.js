import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        maxLength: 8
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        maxLength: 4,
        default: 1
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
    quantity:{
        type:Number,
        default:1
    }

})

const productMod = mongoose.model("products", productSchema);

export default productMod;

