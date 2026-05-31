// const express = require('express');
// or use es6 syntax
import express from 'express'
import cors from 'cors';
import mongoose from "mongoose"

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/course-db")
    .then(() => {
        console.log("successfully connected to db");
    })
    .catch((err) => {
        console.log("error connecting to the db", err.message);
    })
const courseSchema=new mongoose.Schema({
    title:String,
    category:String,
    instructor:String
})    
const Course=mongoose.model('Course',courseSchema)
// const courses = [];
const courses = 
 [
  { id: 1, title: "React Fundamentals", category: "Frontend", instructor: "Arjun" },
  { id: 2, title: "Node.js and Express Basics", category: "Backend", instructor: "Meera" },
  { id: 3, title: "MongoDB Essentials", category: "Database", instructor: "Ravi" },
  { id: 4, title: "Advanced JavaScript Concepts", category: "Frontend", instructor: "Sneha" },
  { id: 5, title: "REST API Development with Express", category: "Backend", instructor: "Kiran" }
];
// middleware=function
// app.use()=application middleware - it will get called for every request hitting server
// express.json()=inbuilt middleware-parsing incoming json payload
// function Course(title,category,instructor){
//     this.id=Date.now();
//     this.title=title;
//     this.category=category;
//     this.instructor=instructor;
//     this.createdAt=new Date();
//     this.save=function(){
//         courses.push(this);
//     };
// }

class Course {
    constructor({ title, category, instructor }) {
        this.id = Date.now();
        this.title = title;
        this.category = category;
        this.instructor = instructor;
        this.createdAt = new Date();
    }
    save() {
        courses.push(this);
    }
    static getById(id){
        return courses.find(ele => ele.id === id);
    }
    static findAllByTitle(title){
        return courses.filter(ele=>ele.title.toLowerCase().includes(title.toLowerCase()));
    }

}
app.post("/create-course", (req, res) => {
    console.log('body', req.body);//request body
    // res.send("post-handler")
    const course = new Course(req.body);
    course.save();
    console.log(courses);
    res.status(201).json(course);
})
app.get('/courses', (req, res) => {
    console.log(req);
    // res.setHeader('Access-Control-Allow-Origin','*') ;
    // this can be done by package at app level npm install cors 
    res.status(200).json(courses);
})

app.get('/courses/search',(req,res)=>{
    const title=req.query.title;
    const result=courses.filter(ele=>ele.title.toLowerCase().includes(title.toLowerCase()));
    // const result=courses.findAllByTitle(title);
    res.status(200).json(result);
})

app.get('/courses/:id', (req, res) => {
    const id = Number(req.params.id);
    // const course = courses.find(ele => ele.id === id); creating static method in class instead of this
    const course =Course.getById(id);
    // handle error first
    if (!course) {
        return res.status(404).json({ error: "course not found" });
    }
    return res.status(200).json(course);
})



app.listen(port, () => {
    console.log("server running on port:" + port);
})