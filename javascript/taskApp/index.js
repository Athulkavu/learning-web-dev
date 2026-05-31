import express from 'express';
import configureTaskDb from './config/db.js';
import Task from './app/models/taskModel.js';
import cors from 'cors';
import { createTask,getAllTasks,getTaskById,deleteTask,updateTask } from './app/controllers/taskController.js';
const port=3345;
const app=express();
app.use(express.json());
app.use(cors());
configureTaskDb();
app.get('/api/tasks',getAllTasks);
app.post('/api/tasks', createTask);
app.get('/api/tasks/:id', getTaskById);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
