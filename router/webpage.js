import {Router} from 'express'
import { index, loginForm, registerForm } from "../controllers/webpage.js";

const webpage = Router()


webpage.get('/',index)
webpage.get('/register',registerForm)
webpage.get('/login',loginForm)


export default webpage