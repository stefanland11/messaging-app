const db = require("../db/notificationQueries");

const createNotification = async (req, res) => {
  try {
    const { recipientId, type } = req.body;
    const senderId = req.user.id;

    const notification = await db.createNotificationQuery(
      parseInt(recipientId),
      parseInt(senderId),
      type
    );
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating notification" });
  }
};

const getNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await db.getNotificationsQuery(parseInt(userId));
    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

const updateNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await db.updateNotificationsQuery(parseInt(userId));
    res.json({ notifications });
  } catch (error) {
    console.error("Error updating notifications", error);
    res.status(500).json({ message: "Error updating notifications" });
  }
};

const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  try {
    await db.deleteNotificationQuery(parseInt(notificationId));
    res.json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification" });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotifications,
  deleteNotification,
};
