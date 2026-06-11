const shortid=require("shortid");
const URL=require('../models/url')

function isValidUrl(string) {
  try {
    const url = new global.URL(string);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
  } catch (err) {
    return false;
  }
}
async function handleGenerateNewShortURL(req,res){ 
  const body=req.body;
  if(!body.url) return res.status(400).json({error:'url is required'})

 if (!isValidUrl(body.url)) {
    return res.status(400).json({ error: 'Invalid URL format. Please provide a valid HTTP/HTTPS link.' });
  }

const shortID=shortid();
await URL.create({ 
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
});
return res.json({id:shortID});
}

async function handleGetAllUrls(req,res){
    const urls = await URL.find({}).sort({ createdAt: -1 });
    
    return res.json({
        urls: urls.map((url) => ({
            id: url._id,
            shortId: url.shortId,
            redirectURL: url.redirectURL,
            shortURL: `${req.protocol}://${req.get("host")}/${url.shortId}`,
            totalClicks: url.visitHistory.length,
            createdAt: url.createdAt,
        })),
    });
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
    if (!entry) return res.status(404).json({ error: "Short URL not found" });
    res.redirect(entry.redirectURL);
 }


async function handleGetAnalytics(req,res){ 
    const shortID=req.params.shortID;
    const result =await URL.findOne({shortId:shortID});
      if (!result) return res.status(404).json({ error: "Short URL not found" });
    return res.json({ 
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}
module.exports={ 
    handleGenerateNewShortURL,handleGetAllUrls,handleGetAnalytics,handleVisitHistory
}
