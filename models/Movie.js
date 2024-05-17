

import {Schema, model} from "mongoose";
import { handlerSaveError, setUpSetting } from "./hooks.js";
import { genreList, realeseYearRegexp } from "../constants/movies-constants.js";


const MovieSchema = new Schema( {
    title: {
        type: String, 
        required: true
    },
    director: {
        type: String, 
        required: true
    },
    favorites: {
        type: Boolean, 
        default: false
    },
     genre: {
        type: String,
        enum: genreList,
        required: true
     },
     releaseYear: {
        type: String,
        match: realeseYearRegexp,
        required: true
     }
});

MovieSchema.pre("findOneAndUpdate", setUpSetting)

MovieSchema.post("save",handlerSaveError)

MovieSchema.post("findOneAndUpdate",handlerSaveError)

const Movie = model("movie", MovieSchema);

export default Movie;