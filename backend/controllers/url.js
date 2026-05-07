const shortid=require("shortid");
const URL=require('../models/url')

async function handleGenerateNewShortURL(req,res){ 
  const body=req.body;
  if(!body.url) return res.status(400).json({error:'url is required'})
const shortID=shortid();
await URL.create({ 
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
});
return res.json({id:shortID});
}

 async function handleVisitHistory(req,res){ 
    const shortID=req.params.shortID;
  const entry=  await URL.findOneAndUpdate(
        { 
            shortId:shortID
        },
        { 
            $push:{ 
                   visitHistory:{ 
                timestamp:Date.now(),
            }
            }
         
        }
    );
    if (!entry) return res.status(404).json({ error: "URL not found" });
    res.redirect(entry.redirectURL);
 }


async function handleGetAnalytics(req,res){ 
    const shortID=req.params.shortID;
    const result =await URL.findOne({shortId:shortID});
      if (!result) return res.status(404).json({ error: "URL not found" });
    return res.json({ 
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}
module.exports={ 
    handleGenerateNewShortURL,handleGetAnalytics,handleVisitHistory
}