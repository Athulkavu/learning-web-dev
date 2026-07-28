import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { configureDB } from './config/db.js';
import usersController from './app/controllers/userController.js';
import {userLoginSchema, userRegistrationSchema} from './app/validations/userValidationSchema.js';
import {checkSchema} from 'express-validator';

import authenticateUser from './app/middlewares/authenticate.js';
import categoryRoutes from './app/routes/categoryRoutes.js';

const app = express();
import cors from 'cors';
app.use(cors());
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
app.get('/profile', authenticateUser, usersController.profile);
app.get('/check-field', usersController.checkField);

app.use('/api/categories', categoryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});