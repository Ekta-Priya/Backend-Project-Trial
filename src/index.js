// require('dotenv').config({path:'./env'})
import express from  "express"
const app=express();
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongo db connectuion failed!!",err)
})








// import expess from "express"
// const app=express()

// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERR:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("ERROR:",error)
//         throw err
//     }
// })()