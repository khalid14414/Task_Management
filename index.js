import express from 'express';
import session from 'express-session';
import passport from 'passport'
import path from 'path'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url';
import { connectToDatabase } from './configs/db.js';
import webpage from './router/webpage.js';
import './configs/passport.js';
import authRouter from './router/auth.js';
import taskRouter from './router/task.js';



const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename)

app.set('view engine','ejs')
app.set('views','views')

// middleware
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(session({secret:process.env.SESSION,resave:false,saveUninitialized:'true'}))
app.use(passport.initialize())
app.use(passport.session())

console.log(__filename,__dirname)



app.use(webpage)
app.use('/auth',authRouter)
app.use(taskRouter)

app.use((req,res)=>{
    console.log("Hello")
    res.render('404',{pageTitle:'Page not found'})
})

const port = process.env.PORT
connectToDatabase()
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})
