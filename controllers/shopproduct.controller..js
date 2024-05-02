import ShopProductsModel from '../models/shopproduct.model'
import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./uploads/shopImage')) {
            cb(null, './uploads/shopImage')
        }
        else {
            fs.mkdirSync('./uploads/shopImage')
            cb(null, './uploads/shopImage')
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

export const getShopProducts = async (req, res) => {
    try {

        const ShopProducts = await ShopProductsModel.aggregate([
            {
                $lookup: {
                    from: "shopcategories",
                    localField: "shop_categories",
                    foreignField: "_id",
                    as: "shop_categories"
                },
            },
            { $unwind: "$shop_categories" },
            { $sort: { '_id': 1 } },
            { $limit: 12},

        ]);

        if (ShopProducts) {
            return res.status(200).json({
                data: ShopProducts,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/shopImage'
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

export const addShopProduct = (req, res) => {
    try {
        const shopimage = upload.single('image')
        shopimage(req, res, function (err) {
            if (err) return res.status(400).json({ message: err.message })

            const { shop_cart, shop_name, short_desc, shop_description, shop_categories, price } = req.body

            let img = null;
            if (req.file) {
                img = req.file.filename;
            }

            const addShop = new ShopProductsModel({
                shop_cart: shop_cart,
                shop_name: shop_name,
                short_desc: short_desc,
                shop_description: shop_description,
                shop_categories: shop_categories,
                price: price,
                image: img
            })
            addShop.save()

            if (addShop) {
                return res.status(201).json({
                    data: addShop,
                    message: 'created'
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

export const getShop = async (req, res)=>{
    try {
        const shoppingID = req.params.shopping_id;
        const shopping = await ShopProductsModel.findOne({_id: shoppingID})

        if(shopping){
            return res.status(200).json({
                data: shopping,
                message: 'Fetched',
                filepath: 'http://localhost:3002/uploads/shopImage'
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

export const deleteShop = async (req, res) => {
    try {
        const shopID = req.params.shop_id;
        const existShop = await ShopProductsModel.findOne({ _id: shopID });
        const delShop = await ShopProductsModel.deleteOne({ _id: shopID });

        if (delShop.acknowledged) {

            if (fs.existsSync('./uploads/shopImage/' + existShop.image)) {
                fs.unlinkSync('./uploads/shopImage/' + existShop.image)
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

export const updateShop = async (req, res) => {
    try {
        const updateImg = upload.single('image');
        updateImg(req, res, async function (err) {
            if (err) return res.status(400).json({ message: err.message })

            const updateID = req.params.update_id;
            const existShop = await ShopProductsModel.findOne({ _id: updateID });

            const { shop_cart, shop_name, short_desc, shop_description, shop_categories, price } = req.body

            let img = existShop.image;
            if (req.file) {
                img = req.file.filename;

                if (fs.existsSync('./uploads/shopImage/' + existShop.image)) {
                    fs.unlinkSync('./uploads/shopImage/' + existShop.image)
                }
            }

            const updateShop = await ShopProductsModel.updateOne({ _id: updateID }, {
                $set: {
                    shop_cart: shop_cart,
                    shop_name: shop_name,
                    short_desc: short_desc,
                    shop_description: shop_description,
                    shop_categories: shop_categories,
                    price: price,
                    image: img
                }
            })
            if (updateShop.acknowledged) {
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
            message: error.message
        })
    }
}