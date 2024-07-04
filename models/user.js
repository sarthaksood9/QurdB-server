import mongoose, { Mongoose } from "mongoose";
import validator from "validator";

import {cartItemSchema} from "./cartModel.js"


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        // unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validator: [validator.isEmail]
    },
    password: {
        type: String,
        require: true,
        // select: false

    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type:[cartItemSchema]
    }
})


const userModel = new mongoose.model("users", UserSchema);

export default userModel;