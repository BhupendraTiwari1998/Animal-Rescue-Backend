import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
import petProfileRouter from './routers/petsprofile.router'
import PetAdoption from './routers/adoption.router'
import CategoryRouter from './routers/categories.router'
import cors from 'cors';
import AboutRouter from './routers/aboutus.router'
import BlogRouter from './routers/blogcategories.router'
import blogProductRouter from './routers/blogproduct.router'
import shopCategoriesRouter from './routers/shopcategories.router'
import shopProductRouter from './routers/shopproduct.router'
import UserRouter from './routers/user.router'
import adminRouter from './routers/admin.router'

const app = express();
app.use(express.json());  // body parser
app.use(cors());
app.use('/uploads/', express.static('uploads'));
const port = 3002;


mongoose.connect('mongodb+srv://Bhupendra:tiwari1234@animalrescue.8djrpo2.mongodb.net/Animal')
  .then(() => console.log('Connected!'));


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})


app.use(petProfileRouter)
app.use(PetAdoption)
app.use(CategoryRouter)
app.use(AboutRouter)
app.use(BlogRouter)
app.use(blogProductRouter)
app.use(shopCategoriesRouter)
app.use(shopProductRouter)
app.use(UserRouter)
app.use(adminRouter)
