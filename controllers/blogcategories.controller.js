import blogcategoriesModel from "../models/blogcategories.model"

export const getBlogCategories = async (req,res)=>{
    try {
        const blogCategories = await blogcategoriesModel.find()
        if(blogCategories){
            return res.status(200).json({
                data: blogCategories, 
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

export const addBlogCategory = (req,res)=>{
    try {

        const {blogcategory_name, blog_description} = req.body;

        const addData = new blogcategoriesModel({
            blogcategory_name: blogcategory_name,
            blog_description: blog_description,
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

export const blogCategory = async (req, res)=>{
    try {
        const blogID = req.params.blog_id;
        const Getcategory = await blogcategoriesModel.findOne({_id: blogID})

        if(Getcategory){
            return res.status(200).json({
                data:Getcategory,
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

export const deleteBlogcategory = async (req, res)=>{
    try {
        const blogID = req.params.blog_id;
        const Delecategory = await blogcategoriesModel.deleteOne({_id: blogID})

        if(Delecategory.acknowledged){
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

export const updateBlogCategory = async (req, res)=>{
    try {

        const updateID = req.params.update_id;
        
        const {blogcategory_name, blog_description} = req.body;

        const update_cat = await blogcategoriesModel.updateOne({_id: updateID},{
            $set:{
                blogcategory_name: blogcategory_name,
                blog_description: blog_description
            }
        })
        if(update_cat.acknowledged){
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