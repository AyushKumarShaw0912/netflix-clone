import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import {fetchFromTMDB} from "../services/tmdb.js"


export const getTrendingMovies=catchAsyncHandler(async(req,res,next)=>{
    const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.json({ success: true, content: randomMovie });
})
export const getMovieTrailers =catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data });
})
export const getMovieDetails=catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data });
})

export const getSimilarMovie=catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, similar: data.results });

})
export const getMoviesByCategory=catchAsyncHandler(async(req,res,next)=>{
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data.results });
})