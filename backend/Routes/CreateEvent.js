const express= require('express')
const router= express.Router();
const EventControler=require('../Controllers/EventControler')
const GetEvents=require('../Controllers/GetEvents')
router.post('/CreateEvent',EventControler.CreateEvent)
router.get('/getEvents',GetEvents)

router.post('/CreateEvent', EventControler.CreateEvent);
router.get('/organizer/:organizerId', EventControler.GetOrganizerEvents);
router.get('/:id', EventControler.GetEventById);
router.post('/mark-attendance', EventControler.MarkAttendance);
router.get('/stats/:organizerId', EventControler.GetOrganizerStats);
router.put('/:id', EventControler.UpdateEvent);
router.delete('/:id', EventControler.DeleteEvent);

module.exports=router;