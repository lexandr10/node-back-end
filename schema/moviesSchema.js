import Joi from "joi";
import { genreList, realeseYearRegexp } from "../constants/movies-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorites: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    releaseYear: Joi.string().pattern(realeseYearRegexp).required()
})
export const moviePutSchem = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorites: Joi.boolean().default(false),
    genre: Joi.string().valid(...genreList),
    releaseYear: Joi.string().pattern(realeseYearRegexp)
})