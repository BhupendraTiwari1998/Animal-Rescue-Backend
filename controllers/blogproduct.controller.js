import BlogCategoryModel from '../models/blogproduct.model'
import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(fs.existsSync('./uploads/blogImage')){
            cb(null, './uploads/blogImage')
        }
        else{
            fs.mkdirSync('./uploads/blogImage')
            cb(null, './uploads/blogImage')
        }
    },
    filename: function(req, file, cb){
        let orName = file.originalname;
        let ext =  path.extname(orName);
        let basename = path.parse(orName).name;
        let filename = basename + '-' + Date.now() + ext
        cb(null, filename)
    }
})
const upload = multer({storage: storage})

export const getBlogProducts = async(req, res)=>{
    try {
        // const limit=req.query;
        const blogProducts = await BlogCategoryModel.aggregate([
            {
                $lookup: {
                    from: "blogcategories",
                    localField: "blog_categories",
                    foreignField: "_id",
                    as: "blog_categories"
                },
            },
            { $unwind: "$blog_categories" },
            { $sort: { '_id': 1 } },
            { $limit: 15},

        ]);
        
        if(blogProducts){
            return res.status(200).json({
                data:blogProducts,
                message : 'Fetched',
                filepath: 'http://localhost:3002/uploads/blogImage'
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

export const addBlogProduct = (req, res)=>{
    try {

        const blogimage = upload.single('image')
        blogimage(req,res, function(err){
            if(err) return res.status(400).json({message: err.message})

            const {blogproduct_name, blogshort_description, blogdescription, master, blog_categories} = req.body

            let img = null;
            if(req.file){
                img = req.file.filename;            
            }

            const addBlog = new BlogCategoryModel({
                blogproduct_name: blogproduct_name,
                blogshort_description: blogshort_description,
                blogdescription: blogdescription,
                master: master,
                blog_categories:blog_categories,
                image:img
            })
            addBlog.save()

            if(addBlog){
                return res.status(201).json({
                    data: addBlog,
                    message:'created'
                })
            }

            return res.status(400).json({
                message: 'Bad request'
            })

        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const getBlog = async (req, res)=>{
    try {
        const blogID = req.params.bloging_id;
        const bloging = await BlogCategoryModel.findOne({_id: blogID})

        if(bloging){
            return res.status(200).json({
                data: bloging,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/blogImage'
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

export const deleteBlog = async (req, res)=>{
    try {
        const blogID = req.params.blog_id;
        const existBlog = await BlogCategoryModel.findOne({_id: blogID});
        const delBlog = await BlogCategoryModel.deleteOne({_id: blogID});

        if(delBlog.acknowledged){
            
            if(fs.existsSync('./uploads/blogImage/' + existBlog.image)){
                fs.unlinkSync('./uploads/blogImage/' + existBlog.image)
            }

            return res.status(200).json({
                message: 'deleted'
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

export const updateBlog = async (req, res) =>{
    try {
        const updateImg = upload.single('image');
        updateImg(req, res, async function(err){
            if(err) return res.status(400).json({message: err.message})

            const updateID = req.params.update_id;
            const existblogs = await BlogCategoryModel.findOne({_id: updateID});

            const {blogproduct_name, blogshort_description, blogdescription, master, blog_categories} = req.body

            let img = existblogs.image;
            if(req.file){
                img = req.file.filename;

                if(fs.existsSync('./uploads/blogImage/' + existblogs.image)){
                    fs.unlinkSync('./uploads/blogImage/' + existblogs.image)
                }
            }

            const updateBlog = await BlogCategoryModel.updateOne({_id: updateID},{
                $set:{
                    blogproduct_name: blogproduct_name,
                    blogshort_description: blogshort_description,
                    blogdescription: blogdescription,
                    master: master,
                    blog_categories:blog_categories,
                    image:img
                }
            })
            if(updateBlog.acknowledged){
                return res.status(200).json({
                    message: 'Updated'
                })
            } 
            return res.status(400).json({
                message: 'Bad request'
            })  
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}