import {Router} from 'express'
import { addTask, dashboard, index, loginForm, registerForm } from "../controllers/webpage.js";
import { ensureAuthenticated } from '../middleware/auth.js';

const webpage = Router()


webpage.get('/',index)
webpage.get('/register',registerForm)
webpage.get('/login',loginForm)

webpage.get('/dashboard',ensureAuthenticated,  dashboard)

webpage.get('/addTask', addTask)


export default webpage