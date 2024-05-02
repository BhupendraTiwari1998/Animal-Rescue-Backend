import mongoose from "mongoose";
import categoriesModel from "./categories.model";

const Schema = mongoose.Schema;

const AdoptionSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:categoriesModel
    },
    
    image:{
        type: String,
        default:null
    },
    status: {
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
export default mongoose.model('Adoption', AdoptionSchema)