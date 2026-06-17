import express from 'express';
import dotenv from 'dotenv'
import configureDB from './config/db.js';
import userController from './controllers/userController.js';
dotenv.config();
const PORT = process.env.PORT;
const app = express();
configureDB();
app.get('/api/users/:uid', userController.getUserByUid);
app.listen(PORT, () => {
  console.log('Server started on PORT:', PORT);
})