import express from 'express'
;
import { create, deleteProduct, productDetail, products, updateProduct } from '../controller/product.js';
import { isAuthenticatedUser } from '../middlewerw/authentication.js';


const productRoutes = express.Router();

productRoutes.get("/products",products);
productRoutes.get("/productDetail/:id",productDetail);
productRoutes.post("/createProduct",create);
productRoutes.put("/updateProducts/:id",updateProduct);
productRoutes.delete("/deleteProducts/:id",deleteProduct);


export default productRoutes;