import mongoose from "mongoose";
import {config} from "dotenv"
config({
    path: "./config/config.env",
  });

export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        if(mongoose.connection.readyState===1){
            console.log("Db connected");
        }
    } catch (error) {
        console.log(error.message)
    }
}