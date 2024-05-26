import Joi from "joi";
import { emailRegexp } from "../constants/user-constans.js";

export const SchemaSignup = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().required().min(6)
})

export const SchemaSignin = Joi.object({
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().required().min(6)
})