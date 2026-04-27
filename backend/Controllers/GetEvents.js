const express =require('express');
const Db= require('../models/Event')
const Getevents =async(req,res)=>{
    try{

        const events = await Db.find({});
        res.status(200).json(events)
    } catch(error){
        res.status(500).json({ message: "Error fetching data", error });
    }
}
module.exports = Getevents;