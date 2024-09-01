import express from "express"
import { getSearchHistory, removeItemSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/searchController.js"
import { isAuthenticated } from "../middlewares/auth.js"



const router=express.Router()

router.get("/person/:query",isAuthenticated,searchPerson)
router.get("/movie/:query",isAuthenticated,searchMovie)
router.get("/tv/:query",isAuthenticated,searchTv)
router.get("/history",isAuthenticated,getSearchHistory)
router.delete("/history/:id",isAuthenticated,removeItemSearchHistory)

export default router