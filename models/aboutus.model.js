import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AboutUsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    status:{
        type:Number,
        default: 1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.model('abouteus', AboutUsSchema)