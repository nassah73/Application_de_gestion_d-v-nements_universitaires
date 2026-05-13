const Notification = require('../models/Notification');

exports.getOrganizerNotifications = async (req, res) => {
    try {
        const { organizerId } = req.params;
        const notifications = await Notification.find({ recipient: organizerId })
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications", error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json({ message: "Notification marquée comme lue" });
    } catch (error) {
        res.status(500).json({ message: "Erreur", error: error.message });
    }
};

exports.markAllAsRead = async (req, res) => {
    try {
        const { organizerId } = req.params;
        await Notification.updateMany({ recipient: organizerId, isRead: false }, { isRead: true });
        res.status(200).json({ message: "Toutes les notifications marquées comme lues" });
    } catch (error) {
        res.status(500).json({ message: "Erreur", error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification supprimée" });
    } catch (error) {
        res.status(500).json({ message: "Erreur", error: error.message });
    }
};
