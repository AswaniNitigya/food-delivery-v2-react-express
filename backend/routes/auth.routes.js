
import express from "express"
import {signin, signout, signup,sendOTP,verifyOTP,resetPassword} from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/signin",signin)
authRouter.get("/signout",signout)
authRouter.post("/send-otp",sendOTP)
authRouter.post("/verify-otp",verifyOTP)
authRouter.post("/reset-password",resetPassword)
export default authRouter 


