const express= require('express')
const router= express.Router();
const EventControler=require('../Controllers/EventControler')
router.post('/CreateEvent',EventControler)
module.exports=router;