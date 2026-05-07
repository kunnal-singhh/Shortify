const express=require("express");
const {handleGenerateNewShortURL,handleGetAnalytics,handleVisitHistory}=require("../controllers/url")
const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortID',handleGetAnalytics);
router.get('/:shortID',handleVisitHistory);
module.exports=router;