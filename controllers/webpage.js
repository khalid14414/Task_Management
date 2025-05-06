import { taskModel } from "../models/task.js"


export const registerForm = (req,res,next)=>{
    res.render('auth/register')
}
export const loginForm = (req,res,next)=>{
    res.render('auth/login')
}
export const editTask = async(req,res,next)=>{
    const {id}= req.params
    const tasks =await taskModel.findById(id)
    if (!tasks) {
        return res.status(400).json({message:"Task not found"})
    }
    res.render('tasks/edit-task',{
        tasks:tasks,
        pageTitle:'Edit Task'
    })
}
export const index = (req,res,next)=>{
    res.render('index')
}
export const addTask = (req,res,next)=>{
    res.render('tasks/addTask')
}
export const dashboard = async(req,res,next)=>{
    if (!req.user) {
        console.log('User not authenticated');
        return res.status(401).redirect('/login');
    }

    const tasks = await taskModel.find({user:req.user._id}).sort({createdAt:-1})
    res.render('tasks/dashboard',
        {
            pageTitle:'Dashboard',user:{name:req.user.userName,
            avatar:req.user.avatar},
            tasks:tasks,
        }
    )
}