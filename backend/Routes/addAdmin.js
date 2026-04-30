const express= require('express')
const {addAdmin}=require('../Controllers/addAdminConroller')
const router=express.Router();
router.post('/ajoutAdmin',addAdmin)
module.exports=router;