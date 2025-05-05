import { Router } from "express";
import { getALLTast } from "../controllers/taskController.js";
import { ensureAuthenticated } from "../middleware/auth.js";


const taskRouter =  Router()


taskRouter.get('/tasks',ensureAuthenticated,getALLTast)




export default taskRouter;

