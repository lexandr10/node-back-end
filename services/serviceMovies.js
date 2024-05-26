import Movie from "../models/Movie.js"
export const getMovies = (search = {}) => {
    const {filter = {}, fields = "", settings = {}} = search;
   return Movie.find(filter,fields, settings)};

export const getMovieById = async (_id) => {
//    const result = await Movie.findOne({_id});
const result = await Movie.findById(_id);   
return result;

}

export const deleteItem = (_id) => Movie.findByIdAndDelete(_id)

export const addMovie = data => Movie.create(data);

export const updateMovie =  (_id, data) => Movie.findByIdAndUpdate(_id, data, );

