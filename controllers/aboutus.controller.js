import AboutusModel from '../models/aboutus.model';
import multer from 'multer';
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./uploads/about')) {
            cb(null, './uploads/about')
        }
        else {
            fs.mkdirSync('./uploads/about')
            cb(null, './uploads/about')
        }
    },
    filename: function (req, file, cb) {
        let orName = file.originalname;
        let ext = path.extname(orName);
        let basename = path.parse(orName).name;
        let filename = basename + '-' + Date.now() + ext
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

export const getAboutUs = async (req, res) => {
    try {
        const getAbout = await AboutusModel.find()

        if (getAbout) {
            return res.status(200).json({
                data: getAbout,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/about'
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

export const addAbout = (req, res) => {
    try {
        const aboutImage = upload.single('image');
        aboutImage(req, res, function (err) {
            if (err) return res.status(400).json({ message: err.message })

            const { name, description } = req.body;

            let img = null;
            if (req.file) {
                img = req.file.filename;
            }

            const AddaboutUs = new AboutusModel({
                name: name,
                description: description,
                image: img
            })
            AddaboutUs.save()

            if (AddaboutUs) {
                return res.status(200).json({
                    date: AddaboutUs,
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

export const getAbout = async (req, res) => {
    try {

        const aboutID = req.params.about_id;
        const about = await AboutusModel.findOne({ _id: aboutID });

        if (about) {
            return res.status(200).json({
                data: about,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/about'
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

export const deleteAbout = async (req, res) => {
    try {
        const aboutID = req.params.about_id;
        const existDelete = await AboutusModel.findOne({ _id: aboutID })

        const delAbout = await AboutusModel.deleteOne({ _id: aboutID })

        if (delAbout.acknowledged) {

            if (fs.existsSync('./uploads/about/' + '/' + existDelete.image)) {
                fs.unlinkSync('./uploads/about/' + existDelete.image)
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

export const updateAbout = async (req, res) => {
    try {
        const updateImage = upload.single('image');
        updateImage(req, res, async function (err) {
            if (err) return res.status(400).json({ message: err.message })

            const updateID = req.params.update_id;
            const existupdate = await AboutusModel.findOne({ _id: updateID })

            const { name, description } = req.body;

            let img = existupdate.image;
            if (req.file) {
                img = req.file.filename;

                if (fs.existsSync('./uploads/about/' + existupdate.image)) {
                    fs.unlinkSync('./uploads/about/' + existupdate.image)
                }
            }

            const updateAboutUs = await AboutusModel.updateOne({ _id: updateID }, {
                $set: {
                    name: name,
                    description: description,
                    image: img
                }
            })
            if (updateAboutUs.acknowledged) {
                return res.status(200).json({
                    message: "updated"
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