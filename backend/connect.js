const mongoose=require('mongoose')

async function connectToMongoDB(url){ 
    return mongoose.connect(url,{ 
        dbName:"short-url"
    });
}

module.exports={connectToMongoDB};