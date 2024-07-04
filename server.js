import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { connectDatabase } from "./config/database.js";
import cartRoutes from "./routes/cartRoutes.js";
import cartMod from "./models/cartModel.js";


const app = express();

dotenv.config();

connectDatabase();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/user",cartRoutes);


app.use("/api/v1/admin",productRoutes);



app.get("/", (req, res) => {
    res.json({ "hi": "hlo" });
})


app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await cartMod.findOne({ user: userId }).populate('products');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  app.delete('/api/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const cart = await cartMod.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const productIndex = cart.products.findIndex(prod => prod.toString() === productId);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
      cart.quantity.splice(productIndex, 1);
  
      await cart.save();
      res.status(200).json({ message: 'Product removed from cart', cart });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });





app.listen(8000, () => {
    console.log("server is running at port 8000");
})

