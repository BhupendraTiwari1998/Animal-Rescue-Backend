import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

    
})

export default mongoose.model("admin", adminSchema)