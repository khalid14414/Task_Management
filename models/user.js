import { model, Schema } from "mongoose";


const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    userName:{
        type:String,
        required: true
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
    avatar:{
        type:String
    }
},{timestamps:true})

export const userModel =model('User',userSchema)