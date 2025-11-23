
const notificationQueries = require('./notificationQueries');

const createNotification = async (userId, mobileNumber, notificationType, title, message, relatedId, priority) => {
  try {
      const notification = await notificationQueries.insertNotificationQuery(userId, mobileNumber, notificationType, title, message, relatedId, priority);
      return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};


const getNotificationsByUserIdAndMobileNumber = async (userId, mobileNumber) => {
  try {
    const notifications = await notificationQueries.getNotificationsByUserIdAndMobileNumberQuery(userId, mobileNumber);
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

const markNotificationAsReadService = async (notificationId) => {
  try {
    const updatedRowsCount = await notificationQueries.updateNotificationsToReadByIdsQuery([notificationId]);
    return updatedRowsCount;
  } catch (error) {
    console.error('Error marking notification as read: ', error);
    throw error;
  }
}


module.exports = {
  createNotification,
  getNotificationsByUserIdAndMobileNumber,
  markNotificationAsReadService
}