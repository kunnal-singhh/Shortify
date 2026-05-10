const express=require("express");
const app=express();
const PORT=8001;
const cors=require('cors')
const urlRoute=require('./routes/url');
const {connectToMongoDB} =require('./connect');
const dotenv=require('dotenv').config()    
 
app.use(cors({origin:'http://localhost:5173'}))
connectToMongoDB(process.env.MONGO_URL)
.then(()=> console.log("Mongo DB connected"));
app.use(express.json()); 
app.use("/url",urlRoute);
app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));