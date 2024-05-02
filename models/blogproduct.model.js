import mongoose from "mongoose";
import blogcategoriesModel from "./blogcategories.model";

const Schema = mongoose.Schema;

const BlogProductSchema = new Schema({
    blogproduct_name: {
        type: String,
        required: true
    },
    blogshort_description: {
        type: String,
        required: true
    },
    blogdescription: {
        type: String,
        required: true
    },
    master: {
        type: String,
        required: true
    },
    blog_categories: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: blogcategoriesModel
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model('blog product', BlogProductSchema)