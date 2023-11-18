import express from "express"
import mongoose from "mongoose"
import Links from "./models/Link.js";
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());


const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if(conn){
        console.log("mongodb connected !");
    }
};
connectDB();

// POST request for creating links 

app.post('/link', async ( req ,res)=>{
const {url,slug}=req.body;
const randomSlug = Math.random().toString(36).substring(2,7)
const createLink = new Links({
url : url,
slug : slug || randomSlug,

})
try{
    const savedLinks = await createLink.save();
    res.json({
    success: true,
    data:{
    shortLinks: `${process.env.BASE_URL}/${savedLinks.slug}`
    },
    message : "successfuly create links....."
    })
}catch (err){
res.json({
    success : false,
    message: err.message
})
}
})
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("server is connected successfully")
})



