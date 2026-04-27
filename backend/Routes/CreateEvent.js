const express= require('express')
const router= express.Router();
const EventControler=require('../Controllers/EventControler')
const GetEvents=require('../Controllers/GetEvents')
router.post('/CreateEvent',EventControler)
router.get('/getEvents',GetEvents)
module.exports=router;