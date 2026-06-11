const express=require("express");
const {handleGenerateNewShortURL,handleGetAllUrls,handleGetAnalytics,handleVisitHistory}=require("../controllers/url")
const router=express.Router();

router.post('/shorten',handleGenerateNewShortURL);
router.get('/urls',handleGetAllUrls);
router.get('/analytics/:shortID',handleGetAnalytics);
router.get('/:shortID',handleVisitHistory);
module.exports=router;
