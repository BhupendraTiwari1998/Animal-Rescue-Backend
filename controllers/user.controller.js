import UserModels from '../models/user.model'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./uploads/userImg')) {
            cb(null, './uploads/userImg')
        }
        else {
            fs.mkdirSync('./uploads/userImg')
            cb(null, './uploads/userImg')
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

export const GetUsers = async (req, res) => {
    try {
        const users = await UserModels.find()
        if (users) {
            return res.status(200).json({
                data: users,
                message: "Message Fetched",
                filepath: "http://localhost:3002/uploads/userImg/"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const AddUser = (req, res) => {
    try {

        const updateData = upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: 'images', maxCount: 10 }]);
        updateData(req, res, function (err) {

            if (err) return res.status(400).json({ message: err.message });
            // console.log(req.body)
            // console.log(req.files)
            const { first_name, last_name, email, contact, password, textarea } = req.body

            let filename = null;
            if (req.file) {
                filename = req.file.filename;
            }

            const adduser = new UserModels({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                contact: contact,
                textarea: textarea,
                image: filename,
            })
            adduser.save();

            if (adduser) {
                return res.status(201).json({
                    data: adduser,
                    message: "Successfully Added",
                })
            }
            return res.status(400).json({
                message: "Bad Request"
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message

        })
    }
}


export const GetUser = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const user = await UserModels.findOne({ _id: userID });
        if (user) {
            return res.status(200).json({
                data: user,
                message: 'fetched',
                filepath: "http://localhost:3002/uploads/userImg"
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

export const DeleteUser = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const existUser = await UserModels.findOne({ _id: userID });
        const deleteUser = await UserModels.deleteOne({ _id: userID });

        if (deleteUser.acknowledged) {

            if (fs.existsSync('./uploads/userImg/' + existUser.image)) {
                fs.unlinkSync('./uploads/userImg/' + existUser.image)
            }

            return res.status(200).json({
                message: "Message Deleted"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}

export const UpdateUser = async (req, res) => {
    try {

        const updateuser = upload.single("image");
        updateuser(req, res, async function (err) {

            if (err) return res.status(400).json({ message: err.message });

            const userID = req.params.user_id;
            const existuser = await UserModels.findOne({ _id: userID });

            const { name, email, password, contact } = req.body

            let filename = existuser.image;
            if (req.file) {
                filename = req.file.filename

                if (fs.existsSync('./uploads/userImg/' + existuser.image)) {
                    fs.unlinkSync('./uploads/userImg/' + existuser.image)
                }
            }

            const updateUser = await UserModels.updateOne({ _id: userID }, {
                $set: {
                    name: name,
                    email: email,
                    password: password,
                    contact: contact,
                    image: filename

                }
            });
            if (updateUser.acknowledged) {
                return res.status(200).json({
                    message: "Update Successfully"
                })
            }
            return res.status(400).json({
                message: "Bad Request"
            })

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const SignUp = async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;
        const existUser = await UserModels.findOne({ email: email })

        if (existUser)
            return res.status(200).json({
                message: "User allready exist"
            });

        const hashedPassword = bcrypt.hashSync(password, 10);  // password convert
        console.log(password, hashedPassword);

        const saveUser = await UserModels.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        });
        if(saveUser){
            return res.status(201).json({
                message:"SignUp Success",
            });
        }
        return res.status(400).json({
            message:"Bad Request"
        })
    } 
    catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    export const Signin = async (req, res)=>{
        try {
            
            const {email,password} = req.body;
            const existUser = await UserModels.findOne({email: email})

            if(!existUser)
            return res.status(200).json({message:"User doesn't exist."});
            
            const checkPassword = bcrypt.compareSync(password, existUser.password);
            if(!checkPassword)
            return res.status(200).json({message:"Invalid credential"});

            const token = jwt.sign(
                {
                    _id:existUser._id,
                    email:existUser.email,
                },
                process.env.TOKEN_SECRET_KEY,
                {expiresIn:"1h"}
            );
            console.log("tokennnn",token);
            return res.status(200).json({
                data: existUser,
                token: token,
                message:"Login Success",
            });

        } catch (error) {
            return res.status(500).json({
                message:error.message
            })
        }
    }