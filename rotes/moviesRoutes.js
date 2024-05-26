import express from 'express';
import { add, deleteMovie, getAll, getById, updateId } from '../controllers/moviesController.js';
import emptyMiddleware from '../middlewares/emptyMiddleware.js';
import isValideId from '../middlewares/isValideId.js';
import authenticate from '../middlewares/authenticate.js';

const moviesRouter = express.Router();
moviesRouter.use(authenticate)
moviesRouter.get("/", getAll);
moviesRouter.get("/:id", isValideId, getById)
moviesRouter.post("/", add)
moviesRouter.put("/:id",isValideId, emptyMiddleware, updateId)
moviesRouter.delete("/:id",isValideId, deleteMovie)
export default moviesRouter;