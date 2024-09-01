import express from "express"
import {isAuthenticated} from "../middlewares/auth.js"
import { authCheck, login, logout, register } from "../controllers/userController.js"

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/authcheck",isAuthenticated,authCheck)

export default router