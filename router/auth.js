import {Router} from 'express';
import passport from 'passport';
import { registerUser } from '../controllers/authController.js';

const authRouter = Router()


authRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))

authRouter.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/home')
})

authRouter.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
})

// Local login and register
authRouter.post('/register', registerUser);


export default authRouter