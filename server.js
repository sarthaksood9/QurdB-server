import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { connectDatabase } from "./config/database.js";
import cartRoutes from "./routes/cartRoutes.js";
import cartMod from "./models/cartModel.js";
import productMod from "./models/productModel.js";
import userModel from "./models/user.js";


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
      cart.quantity=cart.quantity-1;
  
      await cart.save();
      res.status(200).json({ message: 'Product removed from cart', cart });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });




//   app.post('/add', async (req, res) => {
//     const { userId, productId, quantity } = req.body;

//     if (!userId || !productId) {
//         return res.status(400).json({ message: 'User ID and Product ID are required' });
//     }

//     try {
//         // Find the user and the product
//         const user = await userModel.findById(userId).populate('cart');
//         const product = await productMod.findById(productId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Check if the cart exists, if not create one
//         let cart;
//         if (!user.cart) {
//             cart = new cartMod({
//                 user: userId,
//                 products: [],
//                 quantity: 0
//             });
//         } else {
//             cart = await cartMod.findById(user.cart);
//         }

//         // Check if the product is already in the cart
//         const productIndex = cart.products.findIndex(p => p.equals(productId));

//         if (productIndex > -1) {
//             // If the product is already in the cart, update the quantity
//             cart.quantity += quantity || 1;
//         } else {
//             // If the product is not in the cart, add it
//             cart.products.push(productId);
//             cart.quantity += quantity || 1;
//         }

//         // Save the cart
//         await cart.save();

//         // Update the user's cart reference
//         user.cart = cart._id;
//         await user.save();

//         res.status(200).json({ message: 'Product added to cart successfully', cart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


app.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
      // Validate the user
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Validate the product
      const product = await productMod.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Find the user's cart or create a new one
      let cart = await cartMod.findOne({ user: userId });
      if (!cart) {
          cart = new cartMod({ user: userId, products: [], quantity: [] });
      }

      // Check if the product is already in the cart
      const productIndex = cart.products.findIndex(p => p.toString() === productId);
      if (productIndex > -1) {
          // If product exists in the cart, update the quantity
          cart.quantity[productIndex] += quantity;
      } else {
          // If product does not exist in the cart, add it
          cart.products.push(productId);
          // cart.quantity = cart.quantity+1;
      }

      // Save the cart
      await cart.save();

      // Update user's cart reference
      user.cart = cart._id;
      await user.save();

      res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});






app.listen(8000, () => {
    console.log("server is running at port 8000");
})

