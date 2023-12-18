import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Link from "./models/Link.js";
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());

const __dirname = path.resolve();
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
const link = new Link ({
url : url,
slug : slug || randomSlug,
})
try{
    const savedLink = await link.save();
   return res.json({
    success: true,
    data:{
      shortUrl: `${process.env.BASE_URL}/${savedLink.slug}`
    },
    message : "Link save successfully....."
    })
}catch (err){
res.json({
    success : false,
    message: err.message
})
}
})

// app.get('/:slug', async(req,res)=>{
// const {slug}=req.params;

// const link =await Link.findOne({slug : slug});
// await Link.updateOne({slug : slug},{$set : {
//    clicks : link.clicks + 1 
// }})


// if(!link){
//     return res.json({
//         success : false,
//         message : "Link Not Found ."
//     })
// }
// res.redirect(link.url);
// })
app.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const link = await Link.findOne({ slug: slug });
  
    if (!link) {
      return res.json({
        success: false,
        message: "Link Not Found."
      });
    }
  
    await Link.updateOne({ slug: slug }, { $set: { clicks: link.clicks + 1 } });
  
    res.redirect(link.url);
  });

app.get('/api/links',async(req,res)=>{
 
   const findAllLinks = await Link.find({})
   return res.json({
   success : true,
   data : findAllLinks,
   message : "Link fetch Successfully"
  })
})

if(process.env.NODE_ENV = 'production'){
  app.use(express.static(path.join(__dirname, '..','client','build')));


  //* all get request
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'client','build','index.html'))
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})



