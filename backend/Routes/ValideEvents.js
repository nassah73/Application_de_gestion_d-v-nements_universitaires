const express=require('express')
const route=express.Router();
const {valideEvent, rejectEvent, requestModification}= require('../Controllers/ValideEventsController')
route.put('/:id',valideEvent)
route.put('/reject/:id', rejectEvent)
route.post('/request-modification/:id', requestModification)
module.exports = route;