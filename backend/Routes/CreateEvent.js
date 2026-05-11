const express = require('express');
const router = express.Router();
const EventControler = require('../Controllers/EventControler');
const GetEvents = require('../Controllers/GetEvents'); 
const StudentEvents=require('../Controllers/StudentEvents')

router.post('/CreateEvent', EventControler.CreateEvent);


router.get('/getEvents', GetEvents); 
router.get('/organizer/:organizerId', EventControler.GetOrganizerEvents);
router.get('/StuendtEvents',StudentEvents.Student_Events)
router.get('/stats/:organizerId', EventControler.GetOrganizerStats);

router.post('/mark-attendance', EventControler.MarkAttendance);
router.post('/My_events',StudentEvents.setMyEvent)
router.get('/My_registers/:studentId',StudentEvents.My_registers)
router.get('/:id', EventControler.GetEventById);
router.put('/:id', EventControler.UpdateEvent);
router.delete('/:id', EventControler.DeleteEvent);
module.exports = router;