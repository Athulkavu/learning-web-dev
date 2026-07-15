import mongoose from "mongoose";
// import Task from "./teamModel.js";
const matchSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    team1_score:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
     team2_score:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
    team1_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team',
        required:true
    },
    team2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
        validate: {
            validator: function(value) {
                return value.toString() !== this.team1_id.toString();
            },
            message: "A team cannot play a match against itself."
        }
    },
     matchOver: {
        type: Boolean,
        required: true, 
        default:false
    }
    

},{timestamps:true})
const Match=mongoose.model('Match',matchSchema);
export default Match;