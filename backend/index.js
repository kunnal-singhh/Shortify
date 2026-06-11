const express=require("express");
const app=express();

const cors=require('cors')
const urlRoute=require('./routes/url');
const {connectToMongoDB} =require('./connect');
const dotenv=require('dotenv').config()    
 
const PORT = process.env.PORT;
app.use(cors({origin:process.env.CLIENT_URL })) 
connectToMongoDB(process.env.MONGO_URL)
.then(()=> console.log("Mongo DB connected"));
app.use(express.json()); 
app.use("/",urlRoute);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));