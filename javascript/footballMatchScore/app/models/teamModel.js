// import mongoose from "mongoose";
// // import Task from "../app/models/taskModel.js";
// const teamSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     }
// },{timestamps:true})
// const Team=mongoose.model('Team',teamSchema);
// export default Team;

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true //we can use index {unique:,localate:en}
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false 
    }
    
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
export default Team;
