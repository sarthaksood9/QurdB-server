
import userModel from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import sendToken from "../utils/jwtTocken.js";


const isAuth = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SEC);

        const user = await userModel.findOne(decoded._id);
        next();
    }
    else {
        return res.status(401).json({ message: "not a valid user" });
    }


}



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            sendToken(user, 201, res);
        }
        else {
            return res.status(401).json({ error: "Invalid UserName Or Password" });
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const regisrtation = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(401).json("Email Already exists");
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);

            const newEmployee = await userModel.create({
                name: name,
                password: hashPassword,
                email: email,

            });

            console.log(newEmployee)

            sendToken(newEmployee, 201, res)

            // return res.status(200).json({ message: "success", token });

        }
        // console.log(req.body);
        // return res.status(200);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "internal server error" });
    }
}


export const logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "internal server error" });
    }
};