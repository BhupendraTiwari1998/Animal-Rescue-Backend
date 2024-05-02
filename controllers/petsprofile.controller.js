import PetprofileModel from '../models/petsprofile.model'
import multer from "multer";
import path from 'path';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(fs.existsSync('./uploads/petImage')){
            cb(null, './uploads/petImage')
        }
        else{
            fs.mkdirSync('./uploads/petImage')
            cb(null, './uploads/petImage')
        }
    },
    filename: function(req, file, cb){
        let orName = file.originalname;
        let ext = path.extname(orName);
        let basename = path.parse(orName).name
        let filename = basename + '-' + Date.now() + ext
        cb(null, filename)
    }
})
const upload = multer({storage: storage})

export const getPetProfiles = async(req, res)=>{
    try {
        const profiles = await PetprofileModel.find()

        if(profiles){
            return res.status(200).json({
                data: profiles,
                message: 'Fetched',
                filepath:"http://localhost:3002/uploads/petImage"
            })
        }

        return res.status(400).json({
            message:'Bad request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
} 

export const addPetProfile = (req, res)=>{
    try {
        const addimage = upload.single('images');
        addimage(req, res, function(err){
            if(err) return res.status(400).json({message: err.message})

            const {name,breed,description} = req.body

            let img = null;
            if(req.file){
                img = req.file.filename;
            }

            const addProfile = new PetprofileModel({
                name: name,
                breed: breed,
                description: description,
                image: img
            })
            addProfile.save();

            if(addProfile){
                return res.status(201).json({
                    data: addProfile,
                    message: 'Created'
                })
            }

            return res.status(400).json({
                message: 'Bad Request'
            })

        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}

export const getpetProfile = async (req, res)=>{
    try {
        const profileID = req.params.profile_id;
        const Petprofile = await PetprofileModel.findOne({_id: profileID})

        if(Petprofile){
            return res.status(200).json({
                data: Petprofile,
                message: 'fetched'
            })
        }

        return res.status(400).json({
            message:'Bad Request'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const updateProfile = async (req,  res)=>{
    try {

        const updateImage = upload.single('images')
        updateImage(req, res, async function(err){
            if(err) return res.status(400).json({message: err.message})

            const profileID = req.params.profile_id;
            const  existProfile = await PetprofileModel.findOne({_id: profileID})
            const {name, breed, description} = req.body

            let img = existProfile.image;
            if(req.file){
                img = req.file.filename;
                if(fs.existsSync('./uploads/petImage' + existProfile.image)){
                    fs.unlinkSync('./uploads/petImage' + existProfile.image)
                }
            }
            const updatePets = await PetprofileModel.updateOne({_id: profileID},{
                $set:{
                    name: name,
                    breed: breed,
                    description: description,
                    image: img
                }
            })
            if(updatePets.acknowledged){
                return res.status(200).json({
                    message: 'Updated'
                })
            }

            return res.status(400).json({
                message: "Bad request"
            })

        })
        
    } catch (error) {
        return res.status(500).json({
            message :error.message
        })
        
    }
}

export const deleteProfile = async (req, res)=>{
    try {
        const profileID = req.params.profile_id;
        const existProfile = await PetprofileModel.findOne({_id: profileID})
        const deletepets = await PetprofileModel.deleteOne({_id: profileID})

        if(deletepets.acknowledged){
            if(fs.existsSync('./uploads/petImage/' + existProfile.image)){
                fs.unlinkSync('./uploads/petImage/' + existProfile.image)
            }
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