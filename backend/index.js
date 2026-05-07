const express=require("express");
const app=express();
const PORT=8001;
const urlRoute=require('./routes/url');
const {connectToMongoDB} =require('./connect');

connectToMongoDB("mongodb+srv://shortUrl:2fWvvX5hpySfhV3g@cluster0.thj1mdd.mongodb.net/?appName=Cluster0")
.then(()=> console.log("Mongo DB connected"));
app.use(express.json()); 
app.use("/url",urlRoute);
app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));