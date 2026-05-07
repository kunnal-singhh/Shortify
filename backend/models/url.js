const mongoose=require("mongoose");

const urlScheme=new mongoose.Schema({ 
    shortId:{ 
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{ 
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}
);
const URL=mongoose.model("url",urlScheme);  // here url is the collection name
module.exports=URL;