import express from 'express';
import { configureDB } from './config/db.js';
import usersController from './app/controllers/userController.js';
import {userLoginSchema, userRegistrationSchema} from './app/validations/userValidationSchema.js';
import {checkSchema} from 'express-validator';
import dotenv from 'dotenv';
import authenticateUser from './app/middlewares/authenticate.js';
dotenv.config();
const app = express();
const PORT = 3050;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to database
configureDB();
//  Loads .env variables into process.env


// Define a route
app.get('/home', (req, res) => {
    res.json({ message: 'Homepage' });
});
app.post('/register',checkSchema(userRegistrationSchema), usersController.register);
app.post('/login',checkSchema(userLoginSchema), usersController.login);
app.get('/profile', authenticateUser,usersController.profile)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});