import express from 'express';
import configureWordDb from './config/db.js';
import Word from './app/models/wordModel.js';
import cors from 'cors';
import { createNewWord,getAllWords,getWordById } from './app/controllers/wordController.js';
const port=3354;
const app=express();
app.use(express.json());
configureWordDb();

app.post('/api/words',createNewWord);
app.get('/api/words',getAllWords);
app.get('/api/words/:id',getWordById);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

