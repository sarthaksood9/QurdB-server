import express from 'express'
;
import { login, logout, regisrtation } from '../controller/Auth.js';
import { addToCart } from '../controller/cart.js';

const cartRoutes = express.Router();

cartRoutes.post("/addtocart",addToCart);


export default cartRoutes
