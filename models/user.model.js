import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        default:null
    },
    textarea:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

export default mongoose.model('user', UserSchema)