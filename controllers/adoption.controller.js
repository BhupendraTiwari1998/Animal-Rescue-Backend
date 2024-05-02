import AdoptionModel from "../models/adoption.model";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { title } from "process";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(fs.existsSync('./uploads/adoptionPet')){
            cb(null, './uploads/adoptionPet')
        }
        else{
            fs.mkdirSync('./uploads/adoptionPet')
            cb(null, './uploads/adoptionPet')
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

export const getAdoptions = async(req, res)=>{
    try {
        const{limit, page, search}=req.query
        const skipNo = limit*(page-1)
        let pipeline=[]
        const rgx = (petern)=>{
            return new RegExp(`.*${petern}.*`);
        };

        const searchRgx = rgx(search);
        let filter= {};
       
        pipeline.push(
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            { $unwind: "$category" },
            { $sort: { '_id': 1}},
        )
            
        if(parseInt(limit)&& parseInt(page)){
            pipeline.push({$skip:skipNo},{$limit:parseInt(limit)})
        }

        if(search){
            filter={
                $or:[
                    {name:{$regex: searchRgx, $options:'i'}},
                    {description:{$regex: searchRgx, $options:' i'}},
                    // {category_name:{$regex: searchRgx, $options:' i'}},
                ],
            };
            pipeline.push({$match: filter})
        }

        const AdoptionPet = await AdoptionModel.aggregate(pipeline).exec()
        
        if(AdoptionPet){
            return res.status(200).json({
                data:AdoptionPet,
                message : 'Fetched',
                filepath: 'http://localhost:3002/uploads/adoptionPet'
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

export const addAdoption = (req, res)=>{
    try {
        const addImage = upload.single('image');
        addImage(req, res, function(err) {
            if(err) return res.status(400).json({message: err.message})
            const {name, breed, description ,category} = req.body
            
            let img = null;
            if(req.file){
                img = req.file.filename;
            }

            const addPets = new AdoptionModel({
                name: name,
                breed: breed,
                description: description,
                category:category,
                image : img
            })
            addPets.save()

            if(addPets){
                return res.status(201).json({
                    data:addPets,
                    message: 'Created'
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

export const getadoption = async (req, res)=>{
    try {

        const adoptionID = req.params.adoption_id;
        const Adopt = await AdoptionModel.findOne({_id: adoptionID});

        if(Adopt){
            return res.status(200).json({
                data : Adopt,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/adoptionPet'
            })
        }

        return res.status(400).json({
            message: 'Bed request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteAdoption = async (req, res)=>{
    try {
        const adoptionID = req.params.adoption_id;
        const existPet = await AdoptionModel.findOne({_id: adoptionID});
        const adoptPet = await AdoptionModel.deleteOne({_id: adoptionID})

        if(adoptPet.acknowledged){
            
            if(fs.existsSync('./uploads/adoptionPet/' + existPet.image)){
                fs.unlinkSync('./uploads/adoptionPet/' + existPet.image)
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

export const updatePet = async (req, res) =>{
    try {
        const updateImg = upload.single('image');
        updateImg(req, res, async function(err){
            if(err) return res.status(400).json({message: err.message})

            const updateID = req.params.update_id;
            const existUpdate = await AdoptionModel.findOne({_id: updateID});

            const {name, breed, description, category} = req.body;

            let img = existUpdate.image;
            if(req.file){
                img = req.file.filename;

                if(fs.existsSync('./uploads/adoptionPet/' + existUpdate.image)){
                    fs.unlinkSync('./uploads/adoptionPet/' + existUpdate.image)
                }
            }

            const updateAdoption = await AdoptionModel.updateOne({_id: updateID},{
                $set:{
                    name: name,
                    breed: breed,
                    description: description,
                    category:category,
                    image: img
                }
            })
            if(updateAdoption.acknowledged){
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