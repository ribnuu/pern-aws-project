const client = require("../../config/db");

const insertNotificationQuery = async (
  userId,
  mobileNumber,
  notificationType,
  title,
  message,
  relatedId,
  priority
) => {
  const insertQuery = `
      INSERT INTO notifications (user_id, mobile_number, notification_type, title, message, related_id, priority)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
  const values = [
    userId,
    mobileNumber,
    notificationType,
    title,
    message,
    relatedId,
    priority,
  ];

  try {
    const res = await client.query(insertQuery, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error creating notification:", err);
    throw err;
  }
};

const getNotificationsByUserIdAndMobileNumberQuery = async (
  userId,
  mobileNumber
) => {
  // SELECT id, user_id, notification_type, title, message, created_at, read_at, related_id, status, priority

  // const query = `
  //   SELECT *
  //   FROM notifications
  //   WHERE user_id = $1
  //     AND mobile_number = $2
  //     AND (status IS NULL OR status = 'unread');
  // `;
  const query = `
    SELECT * FROM notifications 
    WHERE (user_id = $1 OR mobile_number = $2) AND status = 'unread';
  `;

  const values = [userId, mobileNumber];

  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving notifications:", err);
    throw err;
  }
};

const updateNotificationsToReadByIdsQuery = async (notificationIds) => {
  const updateQuery = `
    UPDATE notifications
    SET status = 'read', read_at = NOW()
    WHERE id = ANY($1::int[]);
  `;
  const values = [notificationIds];

  try {
    // Execute the update query
    const res = await client.query(updateQuery, values);

    // Return the number of rows updated
    return res.rowCount;
  } catch (err) {
    console.error("Error updating notifications:", err);
    throw err;
  }
};

const deleteNotificationsByRelatedId = async (relatedId) => {
  const deleteQuery = `
    DELETE FROM notifications
    WHERE related_id = $1
    RETURNING id;
  `;
  const values = [relatedId];

  try {
    const res = await client.query(deleteQuery, values);
    return res.rows;
  } catch (err) {
    console.error("Error deleting notifications by related_id:", err);
    throw err;
  }
};

module.exports = {
  insertNotificationQuery,
  getNotificationsByUserIdAndMobileNumberQuery,
  updateNotificationsToReadByIdsQuery,
  deleteNotificationsByRelatedId,
};
