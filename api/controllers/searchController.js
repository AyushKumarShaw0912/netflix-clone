import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import {User} from "../model/userModel.js"
import {fetchFromTMDB} from "../services/tmdb.js"


export const searchPerson=catchAsyncHandler(async(req,res,next)=>{
    const {query}=req.params;
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].profile_path,
                title: response.results[0].name,
                searchType: "person",
                createdAt: new Date(),
            },
        },
    });

    res.status(200).json({ success: true, content: response.results });
})

export const searchMovie=catchAsyncHandler(async(req,res,next)=>{
    const {query}=req.params;
    
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
   
    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].title,
                searchType: "movie",
                createdAt: new Date(),
            },
        },
    });
    res.status(200).json({ success: true, content: response.results });

})

export const searchTv=catchAsyncHandler(async(req,res,next)=>{
    const { query } = req.params;
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].name,
                searchType: "tv",
                createdAt: new Date(),
            },
        },
    });
    res.json({ success: true, content: response.results });
})

export const getSearchHistory=catchAsyncHandler(async(req,res,next)=>{
    const {query}=req.params;
   
    res.status(200).json({ success: true, content: req.user.searchHistory });
})

export const removeItemSearchHistory=catchAsyncHandler(async(req,res,next)=>{
    let { id } = req.params;
	id = parseInt(id);
    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            searchHistory: { id: id },
        },
    });

    res.status(200).json({ success: true, message: "Item removed from search history" });
})