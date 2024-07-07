import mongoose from "mongoose";



export const cartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }],
    quantity: {
        type: Number,
        // required: true,
        // min: 1
    }
});

const cartMod = mongoose.model("cart", cartItemSchema);

export default cartMod;