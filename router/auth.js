import {Router} from 'express';
import passport from 'passport';
import { loginUser, registerUser } from '../controllers/authController.js';

const authRouter = Router()


authRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))

authRouter.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/dashboard')
})

authRouter.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
})

// Local login and register
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);


export default authRouter