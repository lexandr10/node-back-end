import path from 'path';
import fs from "fs/promises";
import { nanoid } from 'nanoid';


const pathMovies = path.resolve("movies", "movies.json");


const update = movies => fs.writeFile(pathMovies, JSON.stringify(movies, null, 2));


export const getMovies = async() => {
    const data = await fs.readFile(pathMovies);
    return JSON.parse(data);
}

export const getMovieById = async (id) => {
    const movies = await getMovies();
    const result = movies.find(item => item.id === id);
    return result || null;
}

export const deleteItem = async (id) => {
    const movies = await getMovies();
    const index = movies.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    const [result] = movies.splice(index, 1);
    await update(movies);
    return result;

}
export const addMovie = async(data) => {
    const movies = await getMovies();
    const newMovie = {
        id: nanoid(),
        ...data
    }
    movies.push(newMovie);
    await update(movies);
    return newMovie;
}
export const updateMovie = async (id, data) => {
    const movies = await getMovies();
    const index = movies.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
 movies[index] = {...movies[index], ...data}
    await update(movies);
    return movies[index];
}