import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Please Login to access this resource" });
        }

        const decodedData = jwt.verify(token,  process.env.JWT_SECRE);

        req.user = await userModel.findById(decodedData.id);

        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};