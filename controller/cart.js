import cartMod from "../models/cartModel.js";
import userModel from "../models/user.js";


export const addToCart = async (req, res) => {
    try {
        const {userId,productIds}=req.body;
        const cart=await cartMod.create({
            user:userId,
            products:productIds
        })
        return res.status(200).json({
            success: true,
            cart
        });



    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
