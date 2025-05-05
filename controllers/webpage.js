
import { userModel } from "../models/user.js"
import { taskModel } from "../models/task.js"


export const registerForm = (req,res,next)=>{
    res.render('auth/register')
}
export const loginForm = (req,res,next)=>{
    res.render('auth/login')
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
    console.log('Session user ID:', req.sessionID);

    const tasks = await taskModel.find({user:req.user._id}).sort({createdAt:-1})
    res.render('tasks/dashboard',
        {
            pageTitle:'Dashboard',user:{name:req.user.userName,
            avartar:req.user.avatar|| 'img/default.png'},
            tasks:tasks,
        }
    )
}