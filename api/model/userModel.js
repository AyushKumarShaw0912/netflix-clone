import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please input username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please input email"],
        unique:true,
        validate: validator.isEmail
    },
    password:{
        type:String,
        required:[true,"Please input password"],
        select: false,
        minLength: 6
    },
    image:{
        type:String,
        default:""

    },
    searchHistory:{
        type:Array,
        default:[]
    }
},
{timestamps:true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcryptjs.hash(this.password, 10)
    next()
}
)
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })
}
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password)
}

export const User=mongoose.model("User",userSchema)