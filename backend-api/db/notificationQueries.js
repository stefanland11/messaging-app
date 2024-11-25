const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNotificationQuery(userId, senderId, type){
  try {
    const existingNotification = await prisma.notification.findFirst({
      where: {
        userId,
        sentById: senderId,
        type,
      },
    });

    if (existingNotification) {
      console.log('Notification already exists:', existingNotification);
      return existingNotification;
    }
    
    const newNotification = await prisma.notification.create({
      data: {
        type: type,
        isRead: false,
        user: {
          connect: { id: userId },
        },
        sentBy: {
          connect: { id: senderId }, 
        },
      },
    });
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

async function getNotificationsQuery(userId) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId, 
      },
      include: {
        user: true, 
        sentBy: true, 
      },
    });

    console.log(`Notifications received by user ${userId}:`, notifications);
  }catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
}

async function updateNotificationsQuery(userId) {
  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    console.log("Notifications updated successfully");
    return "Notifications updated successfully";
  } catch (error) {
    console.error("Error updating notifications:", error);
    throw error;
  }
}

async function deleteNotificationQuery(notificationId) {
  try {
    await prisma.notification.delete({
      where: { id: notificationId },
    });

    console.log("Notification deleted successfully");
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}

module.exports = {
  createNotificationQuery,
  getNotificationsQuery,
  updateNotificationsQuery,
  deleteNotificationQuery,
};
