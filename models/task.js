import { model, Schema, Types } from "mongoose";


const taskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum:['Pending','Progress','Completed'],default:'Pending'
    },
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const taskModel = model('Task',taskSchema)