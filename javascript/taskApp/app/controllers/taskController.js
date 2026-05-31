import Task  from "../models/taskModel.js";

export const getAllTasks=(req,res)=>{
    Task.find()
    .then((tasks)=>{
        res.status(200).json({
                count:tasks.length,
                data:tasks
            })
    })
    .catch((err)=>{
        res.status(500).json({ error: err.message });
    })
};

export const createTask=(req,res)=>{
    const {title,description,status,priority}=req.body;
    const newTask=new Task({title,description,status,priority});
    newTask.save()
    .then(savedTask=>res.status(201).json(savedTask))
    .catch(err => res.status(400).json({ error: err.message }))
};

export const getTaskById = (req, res) => {
    const {id}=req.params;
    Task.findById(id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        })
        .catch(err => res.status(500).json({ message: "Invalid ID format" }));
};

export const updateTask = (req, res) => {
    const {id}=req.params;
    const {title,description,status,priority}=req.body;
    Task.findByIdAndUpdate(id, {title,description,status,priority}, { 
        returnDocument: 'after', 
        runValidators: true 
    })
    .then(updatedTask => {
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    })
    .catch(err => res.status(400).json({ error: err.message }));
};

export const deleteTask = (req, res) => {
    const {id}=req.params;
    Task.findByIdAndDelete(id)
        .then(deletedTask => {
            if (!deletedTask) return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task deleted successfully", deletedTask });
        })
        .catch(err => res.status(400).json({ message: "Delete failed" }));
};
