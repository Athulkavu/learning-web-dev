import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import {checkSchema} from 'express-validator'
import configureDB from './config/db.js'
import userscltr from './app/controllers/users-cltr.js';
import { userRegisterSchema,userLoginSchema } from './app/validations/userValidationSchema.js';

import authenticateUser from './app/middlewares/authentication.js';
const app=express();
const port=3050;
app.use(express.json());
configureDB();

app.get('/home',(req,res)=>{
    res.json({
        message:'home page'
    })
})
app.post('/register',checkSchema(userRegisterSchema),userscltr.register);

app.post('/login',checkSchema(userLoginSchema),userscltr.login)
app.get('/profile',authenticateUser,userscltr.profile)
app.listen(port,()=>{
    console.log("server running on port",port);
})
