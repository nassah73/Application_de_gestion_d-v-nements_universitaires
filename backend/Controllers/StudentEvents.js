const Events_db =require('../models/Event')
const Student_Events= async(req,res)=>{
    try{
        const events = await Events_db.find({ status: 'approved' });
        if (events.length === 0) {
            return res.status(200).json({ message: "No approved events yet" });
        }
            res.status(200).json(events)
    }catch(error){
        console.log("SERVER ERROR:", error);
     
     res.status(500).json({ 
            message: "Erreur lors de la récupération des données", 
            error: error.message 
        });
    }

}
module.exports={Student_Events};