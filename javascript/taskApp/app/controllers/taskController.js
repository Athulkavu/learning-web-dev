import Task from "../models/taskModel.js";
import errorFormatter from "../helpers/errorFormatter.js";
export const getAllTasks = (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json({
                count: tasks.length,
                data: tasks
            })
        })
        .catch((err) => {
            // res.status(500).json({ error: err.message });
            res.status(500).json({ error: "something went wrong" });
        })
};

export const createTask = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Data not provided" })
    }
    const { title, description, status, priority } = req.body;
    const newTask = new Task({ title, description, status, priority });
    newTask.save()
        .then(savedTask => res.status(201).json(savedTask))
        .catch(err => {
           if(err.name==='ValidationError'){
             res.status(400).json(errorFormatter(err.errors))
           }
           res.status(500).json({message:"something went wrong"})
        })
};

export const getTaskById = (req, res) => {
    const { id } = req.params;
    Task.findById(id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        })
        .catch(err => {
            if(err.name==='CastError'){
                return res.status(400).json({message:'Invalid id format'})
            }
            res.status(500).json({ message: "something went wrong" })
        })
};

export const updateTask = (req, res) => {
     if (!req.body) {
        return res.status(400).json({ message: "Data not provided" })
    }
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    Task.findByIdAndUpdate(id, { title, description, status, priority }, {
        returnDocument: 'after',
        runValidators: true
    })
        .then(updatedTask => {
            if (!updatedTask) return res.status(404).json({ message: "Task not found" });
            res.json({message:"Task updated successfully",data:updatedTask});
        })
        .catch(err => {
           if(err.name==='ValidationError'){
             res.status(400).json(errorFormatter(err.errors))
           }
        //    else  if(err.name==='CastError'){
        //         return res.status(400).json({message:'Invalid id format'})
        //     } for delete also check this how this going to happen
           res.status(500).json({message:"something went wrong"})
        })
};       

export const deleteTask = (req, res) => {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
        .then(deletedTask => {
            if (!deletedTask) return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task deleted successfully", deletedTask });
        })
        .catch(err => res.status(400).json({ message: "Delete failed" }));
};
