const express=require("express");
const {handleGenerateNewShortURL,handleGetAllUrls,handleGetAnalytics,handleVisitHistory}=require("../controllers/url")
const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/',handleGetAllUrls);
router.get('/analytics/:shortID',handleGetAnalytics);
router.get('/:shortID',handleVisitHistory);
module.exports=router;
