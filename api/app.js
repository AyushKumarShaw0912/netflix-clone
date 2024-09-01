import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import userRoutes from "./router/userRoutes.js"
import movieRouter from "./router/movieRouter.js"
import searchRouter from "./router/searchRouter.js"
import TvRouter from "./router/tvRouter.js"
import ErrorMiddleware from "./middlewares/error.js"
import path from "path"

const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/v1",userRoutes)
app.use("/api/v1/movie",movieRouter)
app.use("/api/v1/tv",TvRouter)
app.use("/api/v1/search",searchRouter)

const __dirname = path.resolve();


	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});

export default app
app.use(ErrorMiddleware)
