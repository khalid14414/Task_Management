import { Router } from "express";
import { createTask, deleteTask, getALLTast, updateTask } from "../controllers/taskController.js";
import { ensureAuthenticated } from "../middleware/auth.js";


const taskRouter =  Router()


taskRouter.get('/tasks',ensureAuthenticated,getALLTast)

taskRouter.post('/new-tasks',ensureAuthenticated,createTask)

taskRouter.put('/tasks/:id',ensureAuthenticated,updateTask)

taskRouter.delete('/tasks/:id',ensureAuthenticated,deleteTask)


export default taskRouter;

