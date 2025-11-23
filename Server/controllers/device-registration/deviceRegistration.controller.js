const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_device_registration_portal WHERE nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createDeviceRegistration = async (req, res) => {
  const {
    device_type,
    device_imei_number,
    device_mac_address,
    nic_number,
    device_make,
    device_model,
    device_registered_datetime,
  } = req.body.formData;

  client.query(
    "INSERT INTO department_device_registration_portal (nic_number , device_type , device_model , device_make , device_imei_number , device_mac_address , device_registered_datetime ) values ( $1, $2, $3, $4 , $5 , $6 , $7)",
    [
      nic_number,
      device_type,
      device_model,
      device_make,
      device_imei_number,
      device_mac_address,
      device_registered_datetime,
    ],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  receiveByNic,
  createDeviceRegistration,
};
