import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/user-constans.js";
import { handlerSaveError, setUpSetting } from "./hooks.js";


const authSchema = new Schema( {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    token : {
        type: String,
        
    }
}, {versionKey: false, timestamps: true});


authSchema.pre("findOneAndUpdate", setUpSetting);
authSchema.post("findOneAndUpdate", handlerSaveError)
authSchema.post("save", handlerSaveError);


const User = model("user", authSchema);
export default User;