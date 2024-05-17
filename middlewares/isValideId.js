import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/httpError.js";


const isValideId = (req, res, next) => {
const {id} = req.params;
if(!isValidObjectId(id)) {
   return next(HttpError(404, `${id} is not valid`))
}
next()
}
export default isValideId