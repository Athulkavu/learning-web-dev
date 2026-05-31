import Word from "../models/wordModel.js";
import analyzeWord from "../helpers/analyzeWord.js";
export const getAllWords = (req, res) => {

    Word.find()
        .then((words)=>{
            res.status(200).json({
                count:words.length,
                data:words
            })
        })
        .catch((err)=>{
            res.status(500).json({message:"something went wrong"})
        })
};

export const createNewWord = (req, res) => {
     const {word}=req.body;
        if(!word || typeof word !=='string' || word.trim()===""){
            return res.status(400).json({message:"Invalid input.word is required"});
        }
    
        const wordStats=analyzeWord(word);
        const newWord=new Word({
            word:word,
            length:wordStats.length,
            vowelCount:wordStats.vowels,
            consonantCount:wordStats.consonants
        });
    
        newWord.save()
        .then((savedData)=>{
            res.status(201).json({
                message: "Word processed successfully", 
                    data: savedData
            });
    
        })
        .catch((err)=>{
            res.status(500).json({message:"something went wrong"});
        })
};

export const getWordById = (req, res) => {
     const {id}=req.params;
    Word.findById(id)
    .then((word)=>{
        if(!word){
            return res.status(404).json({message:"word not found"});
        }
        res.status(200).json({data:word})
    })
    .catch((err)=>{
        res.status(400).json({message:"Inavalid ID format"})
    })
};

/* import Word from "../models/wordModel.js";
import analyzeWord from "../helpers/analyzeWord.js";

// GET all words
export const getAllWords = async (req, res) => {
    try {
        const words = await Word.find();
        res.status(200).json({
            count: words.length,
            data: words
        });
    } catch (err) {
        // 
        res.status(500).json({ message: "Something went wrong while fetching words" });
    }
};

// POST new word analysis
export const createNewWord = async (req, res) => {
    try {
        const { word } = req.body;

        // 1. Validation
        if (!word || typeof word !== 'string' || word.trim() === "") {
            return res.status(400).json({ message: "Invalid input. Word is required" });
        }

        // 2. Logic Analysis
        const wordStats = analyzeWord(word);

        // 3. Database Operation
        const newWord = new Word({
            word: word,
            length: wordStats.length,
            vowelCount: wordStats.vowels,
            consonantCount: wordStats.consonants
        });

        const savedData = await newWord.save();

        res.status(201).json({
            message: "Word processed successfully",
            data: savedData
        });
    } catch (err) {
        res.status(500).json({ message: "Error saving the word analysis" });
    }
};

// GET single word by ID
export const getWordById = async (req, res) => {
    try {
        const { id } = req.params;

        // 
        const word = await Word.findById(id);

        if (!word) {
            return res.status(404).json({ message: "Word not found" });
        }

        res.status(200).json({ data: word });
    } catch (err) {
        // Mongoose throws an error if the ID format is invalid
        res.status(400).json({ message: "Invalid ID format" });
    }
}; */