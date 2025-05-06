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
    try {
        const {title,description,status} = req.body
        const tasks = await taskModel.create({
            title,
            description,
            user:req.user.id,
            status
        })
        res.redirect('/dashboard')
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }

}


export const updateTask = async (req,res)=>{
   try {
     const {id}=req.params
     const {status}=req.body
     const statusList = ['Pending','Progress','Completed']
     if (!statusList.includes(status)) {
         return res.status(400).json({message:"Invalid status"})
     }
     const task = await taskModel.findById(id)
     if (!task) {
         return res.status(400).json({message:"Task not found"})
     }
     task.status = status
     await task.save()
     return res.redirect('/dashboard')
   } catch (error) {
    return res.status(500).json({message:"Internal server error"})
   }
}

export const deleteTask = async (req,res)=>{
    try {
        const {id}=req.params
        const task = await taskModel.findById(id)
        if (!task) {
            return res.status(400).json({message:"Task not found"})
        }
        await taskModel.findByIdAndDelete(id)
        return res.redirect('/dashboard')
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}