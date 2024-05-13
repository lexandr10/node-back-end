import * as serviseMovies from "../services/serviceMovies.js";
import { movieAddSchema, moviePutSchem } from "../schema/moviesSchema.js";


export const getAll = async(rej, res, next) => {
    try {
     const result = await serviseMovies.getMovies();
     res.json(result);
    } catch (error) {
        next(error);
    }
     
}

export const getById = async(rej, res, next) => {
    try {
        const {id} = rej.params;
        const movie = await serviseMovies.getMovieById(id);
        if(!movie) {
            const error = new Error(`Movie with this id=${id} not found`)
            error.status = 404;
            throw error;
        }
        res.json(movie);
    } catch (error) {
      next(error);
    }
}

export const add = async(req,res, next) => {
    try {
        const {error} = movieAddSchema.validate(req.body);
        if(error) {
            const err = new Error(`${error.message}`)
            err.status = 404;
            throw err;
        }
        const newMovie = await serviseMovies.addMovie(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        next(error);
    }
}

export const updateId = async (req, res, next) => {
    try {
        const {error} = moviePutSchem.validate(req.body);
        
            if(error) {
                const err = new Error(`${error.message}`)
                err.status = 404;
                throw err;
            }
            const {id} = req.params;
            const movies = await serviseMovies.updateMovie(id, req.body);
            if(!movies) {
                const er = new Error(`Noway to update data`)
                er.status = 404;
                throw er;   
            }
        res.json(movies);
        
    } catch (error) {
        next(error);
    }
}

export const deleteMovie = async (req, res, next ) => {
    try {
        const {id} = req.params;
        const result = await serviseMovies.deleteItem(id);
        if(!result) {
            const er = new Error(`This item doesn't exist`)
                er.status = 404;
                throw er;   
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}