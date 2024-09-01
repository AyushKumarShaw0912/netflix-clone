import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import {fetchFromTMDB} from "../services/tmdb.js"
import ErrorHandler from "../utils/errorHandler.js";

export const getTrendingTv=catchAsyncHandler(async(req,res,next)=>{
    const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))

		res.json({ success: true, content: randomMovie });
})
export const getTvTrailers =catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data });
})
export const getTvDetails=catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data });
})
export const getSimilarTvs=catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, similar: data.results });

})
export const getTvsByCategory=catchAsyncHandler(async(req,res,next)=>{
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    if(!data) return next(new ErrorHandler("Failed to fetch data",404))
		res.status(200).json({ success: true, content: data.results });
})