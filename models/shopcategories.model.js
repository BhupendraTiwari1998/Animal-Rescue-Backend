import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShopCategoriesSecema = new Schema({
    shopcategories_name:{
        type:String,
        required:true
    },
    shop_description:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    createAt:{
        type:Date,
        default:Date.now()
    }

})
export default mongoose.model('shopcategories', ShopCategoriesSecema)