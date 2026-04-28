const express = require('express');
const router = express.Router();
const EventControler = require('../Controllers/EventControler');
const GetEvents = require('../Controllers/GetEvents'); // هادي غالباً فونكسيون بوحدها

// --- الإعدادات الصحيحة للـ Routes ---

// 1. إنشاء حدث (POST)
// ملاحظة: الـ upload كاين ديجا وسط الـ Controller عندك، داكشي علاش ما غنزيدوهش هنا باش ما يوقعش تضارب
router.post('/CreateEvent', EventControler.CreateEvent);

// 2. جلب الأحداث (GET)
router.get('/getEvents', GetEvents); // الفونكسيون اللي كتجيب كاع الأحداث
router.get('/organizer/:organizerId', EventControler.GetOrganizerEvents);
router.get('/:id', EventControler.GetEventById);
router.get('/stats/:organizerId', EventControler.GetOrganizerStats);

// 3. العمليات الأخرى (Attendance, Update, Delete)
router.post('/mark-attendance', EventControler.MarkAttendance);
router.put('/:id', EventControler.UpdateEvent);
router.delete('/:id', EventControler.DeleteEvent);

module.exports = router;