import express from "express"
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovie, getTrendingMovies } from "../controllers/movieController.js"


const router=express.Router()

router.get("/trending",getTrendingMovies)
router.get("/:id/trailers",getMovieTrailers)
router.get("/:id/similar",getSimilarMovie)
router.get("/:id/details",getMovieDetails)
router.get("/:category",getMoviesByCategory)

export default router