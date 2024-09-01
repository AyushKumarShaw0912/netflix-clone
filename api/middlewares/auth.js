import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/errorHandler.js"

import { User } from "../model/userModel.js";
import { catchAsyncHandler } from "./catchAsyncHandler.js";


export const isAuthenticated=catchAsyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token) return next(new ErrorHandler("Invalid user token",404))

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
   
    req.user=await User.findById(decoded._id)
   
    next()
})

