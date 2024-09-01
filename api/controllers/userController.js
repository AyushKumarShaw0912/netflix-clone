import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import { User } from "../model/userModel.js";
import {sendToken} from "../utils/sendToken.js"
import ErrorHandler from "../utils/errorHandler.js"


export const register=catchAsyncHandler(async(req,res,next)=>{
    const {username,email,password}=req.body;
    if (!username || !email || !password)
        return next(new ErrorHandler("Please enter all field", 400));
    let user=await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User already exists",404));

    }
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    user=await User.create({
        username,
        email,
        password,
        image
    })
    sendToken(res, user, "Registration successful", 201)
})

export const login = catchAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password)
        return next(new ErrorHandler("Please enter all field", 400));
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Incorrect email or password", 404))
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 404))
    sendToken(res, user, `Welcome back ${user.username}`, 200)

})
export const logout = catchAsyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        //secure: true,
        //sameSite: "none",
    }).json({
        success: true,
        message: "Logout successful"
    })
})
export const authCheck=catchAsyncHandler(async(req,res,next)=>{
    if(!req.user){
       return next(new ErrorHandler("Authentication failed",404))
    }
    res.status(200).json({ success: true, user: req.user });
})