const mongoose=require("mongoose")


const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:true
    },
    security:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"u can add the description later :)"
    }
},{timestamps:true})

module.exports = mongoose.model("Project",projectSchema)
