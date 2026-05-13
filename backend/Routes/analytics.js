const express = require('express');
const router = express.Router();
const Registration = require('../models/My_Events'); 
const Student = require('../models/Student'); 
const mongoose = require('mongoose');

router.get('/my-stats', async (req, res) => {
    try {
        const { studentId } = req.query;
        if (!studentId) return res.status(400).json({ error: "Missing studentId" });
        
        const objectId = new mongoose.Types.ObjectId(studentId);

        // 1. عدد الأحداث
        const eventsAttended = await Registration.countDocuments({ 
            student: objectId, 
            status: 'pending' 
        });

        // 2. توزيع الاهتمامات (Interests)
        const interestsStats = await Registration.aggregate([
            { $match: { student: objectId, status: 'pending' } },
            { 
                $lookup: { 
                    from: 'events', 
                    localField: 'event', 
                    foreignField: '_id',
                    as: 'eventDetails'
                }
            },
            { $unwind: '$eventDetails' },
            { $group: { _id: '$eventDetails.category', count: { $sum: 1 } } }
        ]);

        const totalEvents = interestsStats.reduce((acc, curr) => acc + curr.count, 0);
        const formattedInterests = interestsStats.map(item => ({
            label: item._id,
            value: Math.round((item.count / totalEvents) * 100),
        }));

        // 3. النشاط الشهري (Monthly Activity) - هادا هو اللي كان ناقصك
        const monthlyStats = await Registration.aggregate([
            { $match: { student: objectId, status: 'pending' } },
            { 
                $group: { 
                    _id: { $month: "$registrationDate" }, // استخراج رقم الشهر من الحقل اللي ف الصورة
                    count: { $sum: 1 } 
                } 
            },
            { $sort: { "_id": 1 } }
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedMonthly = monthlyStats.map(item => ({
            month: monthNames[item._id - 1], 
            count: item.count
        }));

        // إرسال البيانات كاملة
        res.json({
            eventsAttended,
            presenceRate: 100, 
            totalPoints: 0,
            interests: formattedInterests.length > 0 ? formattedInterests : [{label: 'Général', value: 100}],
            monthlyActivity: formattedMonthly // دابا ولات عامرة بالداتا
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;