
import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'name required']
    },
    last_name: {
        type: String,
        required: [true, 'name required']
    },
    birthday: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
    },
    gender: {
        type: String,
        required: [true, 'gender required'],
    },
    password: {
        type: String,
        required: [true, 'password required'],
    },
    confirmEmail: {
        type: Boolean,
        default:false,
    },

})

export const userModel= mongoose.model('user' , userSchema)