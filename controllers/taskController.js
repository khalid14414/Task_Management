import { taskModel } from "../models/task.js"

export const getALLTast = async (req,res)=>{
   try {
     const task = await taskModel.find({user:req.user.id})
     if (!task) {
         return res.status(400).json({message:"Task not found"})
     }
     return res.status(200).json(task)
   } catch (error) {
     next(error)
   }
}

export const getTaskById = async (req,res) =>{
   try {
     const {id}= req.params
     const task = await taskModel.findById({id,user:req.user.id})
     if (!task) {
         return res.status(400).json({message:"Task not found"})  
     }
     return res.status(200).json(task)
   } catch (error) {
    next(error)
   }
}

export const createTask = async (req,res)=>{
    console.log(req.user)
    const {title,description} = req.body
    const tasks = await taskModel.create({
        title,
        description,
        user:req.user.id
    })
    res.redirect('/dashboard')

}


export const updateTask = async (req,res)=>{}