import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import db from './src/db/db.config.js'

import { mainRoute } from './src/api/main.route.js';
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use('/api',mainRoute)
const startServer = async()=>{
try{
    const connection = await db.getConnection();
    console.log("db connected")
    app.listen(3788,(err)=>{
        console.log("server is running ,http://localhost/3788 ")
    })
}catch(err){
    console.log("error happen",err)
}
}
startServer()