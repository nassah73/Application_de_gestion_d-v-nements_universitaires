const express=require('express')
const route=express.Router();
const {valideEvent}= require('../Controllers/ValideEventsController')
route.put('/:id',valideEvent)
module.exports = route;