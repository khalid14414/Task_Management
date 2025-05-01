export const registerForm = (req,res,next)=>{
    res.render('auth/register')
}
export const loginForm = (req,res,next)=>{
    res.render('auth/login')
}
export const index = (req,res,next)=>{
    res.render('index')
}