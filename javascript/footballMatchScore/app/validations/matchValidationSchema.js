import Team from "../models/teamModel.js";

export const matchValidationSchema = {
    title: {
        exists: {
            errorMessage: "Title field is required"
        },
        notEmpty: {
            errorMessage: "Title cannot be empty"
        },
        trim: true
    },
    
    team1_id: {
        exists: {
            errorMessage: "Team 1 ID is required"
        },
        isMongoId: {
            errorMessage: "Team 1 must be a valid Mongo ID format"
        },
        custom: {
            options: async function (value) {
                const team = await Team.findById(value);
                if (!team) {
                    throw new Error("Team 1 does not exist in the database");
                }
                return true;
            }
        }
    },
    
    team2_id: {
        exists: {
            errorMessage: "Team 2 ID is required"
        },
        isMongoId: {
            errorMessage: "Team 2 must be a valid Mongo ID format"
        },
        custom: {
            options: async function (value, { req }) {
                if (value === req.body.team1_id) {
                    throw new Error("A team cannot play a match against itself");
                }
                const team = await Team.findById(value);
                if (!team) {
                    throw new Error("Team 2 does not exist in the database");
                }
                return true;
            }
        }
    },
    
    team1_score: {
        optional: true, 
        isInt: {
            options: { min: 0 },
            errorMessage: "Team 1 score must be a positive integer"
        },
        toInt: true
    },
    
    team2_score: {
        optional: true, 
        isInt: {
            options: { min: 0 },
            errorMessage: "Team 2 score must be a positive integer"
        },
        toInt: true
    },
    
    matchOver: {
        optional: true,
        isBoolean: {
            errorMessage: "matchOver field must be a true or false value"
        },
        toBoolean: true
    }
};







// import { body, validationResult } from 'express-validator';

// app.post('/api/matches', [
//     body('title').trim().notEmpty().withMessage('Title is required'),
//     body('team1_id').isMongoId().withMessage('Team 1 must be a valid Mongo ID'),
    
//     // 👇 This is how you check if they are the same in express-validator
//     body('team2_id')
//         .isMongoId().withMessage('Team 2 must be a valid Mongo ID')
//         .custom((value, { req }) => {
//             if (value === req.body.team1_id) {
//                 throw new Error('A team cannot play a match against itself.');
//             }
//             return true; // Return true if the validation passes
//         })
// ], async (req, res) => {
    
//     // 1. Instantly check if Express Validation failed
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { title, team1_id, team2_id } = req.body;
        
//         // 2. Database existence check (Mongoose handles this part)
//         const team1Exists = await Team.findById(team1_id);
//         const team2Exists = await Team.findById(team2_id);
//         if (!team1Exists || !team2Exists) {
//             return res.status(404).json({ error: "One or both teams do not exist." });
//         }

//         const match = new Match({ title, team1_id, team2_id });
//         const savedMatch = await match.save();
//         res.status(201).json(savedMatch);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });
