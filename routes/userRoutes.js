import express from 'express'
;
import { login, logout, regisrtation } from '../controller/Auth.js';

const userRoutes = express.Router();

userRoutes.post("/registration",regisrtation);
userRoutes.post("/login",login);
userRoutes.get("/logout",logout);

export default userRoutes;