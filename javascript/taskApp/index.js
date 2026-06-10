import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import configureTaskDb from './config/db.js';
import Task from './app/models/taskModel.js';
import cors from 'cors';
import { createTask,getAllTasks,getTaskById,deleteTask,updateTask } from './app/controllers/taskController.js';
import userscltr from './app/controllers/userController.js';
import {checkSchema} from 'express-validator'
import { userLoginSchema, userRegisterSchema } from './app/validations/userValidationSchema.js';
import authenticateUser from './app/middleware/authentication.js';
// import adminOnly from './app/middleware/adminOnly.js';
import authorizeUser from './app/middleware/authorizeUser.js';
const port=3345;
const app=express();
app.use(express.json());
app.use(cors());
configureTaskDb();

app.get('/api/tasks',authenticateUser,getAllTasks);
app.post('/api/tasks',authenticateUser, createTask);
app.get('/api/tasks/:id',authenticateUser, getTaskById);
app.put('/api/tasks/:id',authenticateUser, updateTask);
app.delete('/api/tasks/:id',authenticateUser, deleteTask);

app.post('/api/users/register',checkSchema(userRegisterSchema),userscltr.register);
app.post('/api/users/login',checkSchema(userLoginSchema),userscltr.login);
app.get('/api/users/account',authenticateUser,userscltr.account);
// app.get('/api/users',authenticateUser,adminOnly,userscltr.list); this for the easy approch authorization
app.get('/api/users',authenticateUser,authorizeUser(['admin','manager']),userscltr.list);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
