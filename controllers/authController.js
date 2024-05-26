import ctrlWrapper from "../decorators/ctrlWrapper.js"
import compareHash from "../helpers/comparePass.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { findUser, saveUser, updateUser } from "../services/authService.js";


export const singup = async (req, res) => {
const {email} = req.body;
const user = await findUser({email});
if(user) {
    throw HttpError(409, "Email already use")
}
const newUser = await saveUser(req.body);
res.status(201).json({
    username: newUser.username,
    email: newUser.email
})
}

export const signin = async (req, res) => {

const {email, password} = req.body;

const checkEmail = await findUser({email});
if(!checkEmail) {
    throw HttpError(409, "Email or password invalid")
}
const comparePass = await compareHash(password,checkEmail.password);
if(!comparePass) {
    throw HttpError(409, "Email or password invalid")
}

const {_id: id} = checkEmail;
const payload = {
    id,
}
const token = createToken(payload);

await updateUser(id, {token})
res.json(token);

}

export const getCurrent = (req, res) => {
    const {username, email} = req.user;

    res.json({username, email})
}

export const signout = async(req, res) => {
    const {_id} = req.user;
await updateUser(_id, {token: ""})
}

export default {
    singup: ctrlWrapper(singup),
    signin: ctrlWrapper(signin)
}