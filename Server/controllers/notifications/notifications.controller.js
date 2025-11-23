const client = require("../../config/db");
const notificationService = require("../../services/notifications/notificationService");

const getAllNotifictions = async (req, res) => {

    const { userId, mobileNumber} = req.body;
    const query = `
        SELECT 
            ddop.offense_date_time, 
            ddop.license_number,
            ddop.vehicle_number,
            ddop.mobile_number,
            ddop.reference_number,
            cum.username AS officer_name,
            ddom.offense AS offense_name,
            ddom.fine AS fine_amount,
            'trafficOffense' AS notificationtype  -- Adding default type
        FROM 
            department_drivers_offense_portal ddop
        INNER JOIN 
            ccc_user_masterfile cum 
        ON 
            ddop.police_officer_id = cum.user_id
        INNER JOIN
            department_drivers_offense_master ddom
        ON
            ddop.offense_id = ddom.id
        WHERE 
            RIGHT(ddop.mobile_number, 9) = RIGHT($1, 9)
    `;

    client.query(query, [mobileNumber], (err, results) => {
        if (err) {
            res.send({success: false, msg: 'Failed to fetch records', er: err.message});
        } else {
            res.send({success: true, data: results.rows ?? []});
        }
    });
}

const getNotificationsByUserAndMobileNumberController = async (req, res, next) => {
    const { userId, mobileNumber } = req.body;  // Assuming userId and mobileNumber are passed as parameters
  
    try {
      const notifications = await notificationService.getNotificationsByUserIdAndMobileNumber(userId, mobileNumber);
      
      res.json({ success: true, notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


const markNotificationAsReadController = async (req, res, next) => {
    const { notificationId } = req.body;  // Assuming userId and mobileNumber are passed as parameters
  
    try {
      const updatedRowsCount = await notificationService.markNotificationAsReadService(notificationId)
      
      res.json({ success: true, updatedRowsCount });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  

  

module.exports = {
    getAllNotifictions,
    getNotificationsByUserAndMobileNumberController,
    markNotificationAsReadController,
}