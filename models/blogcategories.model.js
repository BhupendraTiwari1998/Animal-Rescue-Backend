import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogcategoriesSchema = new Schema({
    blogcategory_name: {
        type : String,
        required: true
    },
    blog_description:{
        type: String,
        required: true
    },
    status:{
        type:Number,
        default: 1
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('blogcategories', blogcategoriesSchema)