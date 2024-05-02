import mongoose from "mongoose";
import shopcategoriesModel from "./shopcategories.model";

const Schema = mongoose.Schema;

const ShopProductSchema = new Schema({
    shop_cart:{
        type: String,
        required:true
    },
    shop_name:{
        type:String,
        required: true
    },
    short_desc:{
        type:String,
        required:true
    },
    shop_description:{
        type:String,
        required:true
    },
    shop_categories: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: shopcategoriesModel
    },
    price:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    status:{
        type:Number,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
export default mongoose.model('shopproduct', ShopProductSchema)