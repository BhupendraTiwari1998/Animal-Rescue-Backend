import shopcategoriesModel from "../models/shopcategories.model"

export const getShopCategories = async (req,res)=>{
    try {
        const shopCategories = await shopcategoriesModel.find()
        if(shopCategories){
            return res.status(200).json({
                data: shopCategories, 
                message: 'Fetched'
            })
        }
        return res.status(400).json({
            message: 'Bad request'
        })
     
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const addShopCategories = (req,res)=>{
    try {

        const {shopcategories_name, shop_description} = req.body;

        const addData = new shopcategoriesModel({
            shopcategories_name: shopcategories_name,
            shop_description: shop_description,
        })
        addData.save()

        if(addData){
            return res.status(201).json({
                data: addData,
                message: 'Created'
            })
        }

        return res.status(400).json({
            message: 'Bad request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const getShopcategory = async (req, res)=>{
    try {
        const shoppingID = req.params.shopping_id;
        const shopping = await shopcategoriesModel.findOne({_id: shoppingID})

        if(shopping){
            return res.status(200).json({
                data: shopping,
                message: 'Fetched'
            })
        }

        return res.status(400).json({
            message: 'Bad request'
        })
        
    } catch (error) {
        return res.status(200).json({
            message: error.message
        })
        
    }
}

export const deleteShopcategories = async (req, res)=>{
    try {
        const shopID = req.params.shop_id;
        const Delcategory = await shopcategoriesModel.deleteOne({_id: shopID})

        if(Delcategory.acknowledged){
            return res.status(200).json({
                message: 'Deleted'
            })
        }

        return res.status(400).json({
            message: 'Bad request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const updateShopCategories = async (req, res)=>{
    try {

        const updateShopID = req.params.updateShop_id;
        
        const {shopcategories_name, shop_description} = req.body;

        const updateShop_cat = await shopcategoriesModel.updateOne({_id: updateShopID},{
            $set:{
                shopcategories_name: shopcategories_name,
                shop_description: shop_description
            }
        })
        if(updateShop_cat.acknowledged){
            return res.status(200).json({
                message: 'Updated'
            })
        }

        return res.status(400).json({
            message: 'Bad request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}