import CategoriesModel from "../models/categories.model"


export const getCategories = async (req,res)=>{
    try {
        const Categories = await CategoriesModel.find()
        if(Categories){
            return res.status(200).json({
                data: Categories,
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

export const addCategory = (req,res)=>{
    try {

        const {category_name, description} = req.body;

        const addData = new CategoriesModel({
            category_name: category_name,
            description: description,
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

export const getCategory = async (req, res)=>{
    try {
        const categoryID = req.params.category_id;
        const Getcategory = await CategoriesModel.findOne({_id: categoryID})

        if(Getcategory){
            return res.status(200).json({
                data:Getcategory,
                message: 'Fatched'
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


export const deleteCategory = async (req, res)=>{
    try {
        const categoryID = req.params.category_id;
        const Delcategory = await CategoriesModel.deleteOne({_id: categoryID})

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

export const updateCategory = async (req, res)=>{
    try {

        const updateID = req.params.update_id;
        
        const {category_name, description} = req.body;

        const update_category = await CategoriesModel.updateOne({_id: updateID},{
            $set:{
                category_name: category_name,
                description: description
            }
        })
        if(update_category.acknowledged){
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