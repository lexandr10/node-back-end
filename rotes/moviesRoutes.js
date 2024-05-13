import express from 'express';
import { add, deleteMovie, getAll, getById, updateId } from '../controllers/moviesController.js';
import emptyMiddleware from '../middlewares/emptyMiddleware.js';
const moviesRouter = express.Router();

moviesRouter.get("/", getAll);
moviesRouter.get("/:id", getById)
moviesRouter.post("/", add)
moviesRouter.put("/:id", emptyMiddleware, updateId)
moviesRouter.delete("/:id", deleteMovie)
export default moviesRouter;