import { Router } from "express";
import { createTask, getALLTast } from "../controllers/taskController.js";
import { ensureAuthenticated } from "../middleware/auth.js";


const taskRouter =  Router()


taskRouter.get('/tasks',ensureAuthenticated,getALLTast)

taskRouter.post('/new-tasks',ensureAuthenticated,createTask)



export default taskRouter;

