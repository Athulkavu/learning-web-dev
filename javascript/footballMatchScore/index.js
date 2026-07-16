import express from "express";
import configureDb from "./config/db.js";
import Team from "./app/models/teamModel.js";
import errorFormatter from "./app/helpers/errorFormatter.js";
import Match from "./app/models/matchModel.js"; 
import cors from "cors";
import { matchValidationSchema } from "./app/validations/matchValidationSchema.js"; 
import { checkSchema, validationResult } from "express-validator";
const app = express();
app.use(cors());
const port = 3356;

app.use(express.json());
configureDb();

app.get('/', (req, res) => {
    res.json({ "msg": "welcome to the football site" });
});

// app.post('/api/teams', async (req, res) => {
//     try {
//         const { name } = req.body;

//         const existingTeam = await Team.findOne({name });
//         if (existingTeam) {
//             return res.status(400).json({ error: "Team name must be unique" });
//         }

//         const team = new Team({ name: name });
//         const teamRecord = await team.save();
       
//         res.status(201).json(teamRecord);
//     } catch (err) {
//         res.status(400).json(errorFormatter(err));
//         console.log(err);
//     }
// });


app.post('/api/teams', async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Team name is required" });
        }
        // '^' means starts with, '$' means ends with, 'i' means case-insensitive
        const existingTeam = await Team.findOne({ 
            name: { $regex: `^${name.trim()}$`, $options: 'i' } 
        });

        if (existingTeam) {
            return res.status(400).json({ error: `The team name '${name}' already exists (case-insensitive conflict).` });
        }
        const team = new Team({ name: name.trim() });
        const teamRecord = await team.save();
       
        res.status(201).json(teamRecord);
    } catch (err) {
        res.status(400).json(errorFormatter(err));
        console.log(err);
    }
});



app.get('/api/teams', async (req, res) => {
    try {
        const teams = await Team.find(); 
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ error: "failed to get teams" });
    }
});

app.delete('/api/teams/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedTeam = await Team.findByIdAndDelete(id);

        if (!deletedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json(deletedTeam);
    } catch (err) {
        res.status(500).json({ error: "Failed to delete team" });
    }
});



// create

app.post('/api/matches', checkSchema(matchValidationSchema), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
       
        const match = new Match(req.body);
        const savedMatch = await match.save();
        res.status(201).json(savedMatch);
    } catch (err) {
        // res.status(400).json(errorFormatter(err));
        res.status(400).json({ errors: err.message});
    }
});

app.get('/api/matches', async (req, res) => {
    try {
        const matches = await Match.find()
            .populate('team1_id', 'name')
            .populate('team2_id', 'name');
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).json({ error: "something went wrong" });
    }
});

//match by id
app.get('/api/matches/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
            .populate('team1_id', 'name')
            .populate('team2_id', 'name');

        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.status(200).json(match);
    } catch (err) {
        res.status(500).json({ error: "something went wrong" });
    }
});


// app.put('/api/matches/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body; 
//         const updatedMatch = await Match.findByIdAndUpdate(id, updates, {  returnDocument: 'after', runValidators: true })
//             .populate('team1_id', 'name')
//             .populate('team2_id', 'name');

//         if (!updatedMatch) {
//             return res.status(404).json({ error: "Match not found" });
//         }

//         res.status(200).json(updatedMatch);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });
// Update and reset decided on quary params

// use $inc

app.put('/api/matches/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.query; 

        let updateData = {};

        if (action === 'reset') {
            updateData = {
                team1_score: 0,
                team2_score: 0,
                matchOver: false
            };
        } 
        else if (action === 'update') {
            updateData = { ...req.body };
            // Optional Safety: Remove IDs if sent in body so they can't change mid-game
            delete updateData.team1_id;
            delete updateData.team2_id;
        } 
        
        else {
            return res.status(400).json({ 
                error: "Invalid action'." 
            });
        }
        const updatedMatch = await Match.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true })
            .populate('team1_id', 'name')
            .populate('team2_id', 'name');

        if (!updatedMatch) {
            return res.status(404).json({ error: "Match not found" });
        }

        res.status(200).json(updatedMatch);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// delete
// app.delete('/api/matches/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedMatch = await Match.findByIdAndDelete(id);

//         if (!deletedMatch) {
//             return res.status(404).json({ error: "Match not found" });
//         }

//         res.status(200).json({ message: "Match deleted successfully", deletedMatch });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to delete match" });
//     }
// });

app.delete('/api/teams/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }


// The $or syntax is a built-in MongoDB logical query operator. It allows you to search your database for documents that match 
// at least one of multiple conditions, acting just like the logical || (OR) operator in JavaScript.        
// Slower and redundant approach
// const isTeam1 = await Match.findOne({ team1_id: id });
// const isTeam2 = await Match.findOne({ team2_id: id });

        const hasMatchHistory = await Match.findOne({
            $or: [
                { team1_id: id },
                { team2_id: id }
            ]
        });

        if (hasMatchHistory) {
           
            team.isDeleted = true;
            await team.save();
            return res.status(200).json({ 
                message: "Team has historical matches. Soft deleted successfully.remove all other matches of this team for permenent delete ", 
                type: "soft",
                team 
            });
        } else {
            await Team.findByIdAndDelete(id);
            return res.status(200).json({ 
                message: "Team had no match history. Permanently deleted from database.", 
                type: "permanent",
                teamId: id 
            });
        }

    } catch (err) {
        res.status(500).json({ error: "Failed to process team deletion" });
    }
});



app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});
