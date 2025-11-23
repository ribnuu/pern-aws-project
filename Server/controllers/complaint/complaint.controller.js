const client = require("../../config/db");

const createMissingVehicle = async (req, res) => {
  const {
    missing_vehicle_number,
    missing_vehicle_owner_name,
    missing_vehicle_owner_address,
    missing_vehicle_make,
    missing_vehicle_model,
    lost_date_time,
    last_seen_date_time,
    last_seen_location,
    reported_nic_number,
    missing_vehicle_description,
  } = req.body.formVehicleData;
  const complaint_number = await req.body.NewComplaintId;
  client.query(
    "INSERT INTO police_complaint_missing_vehicle (missing_vehicle_number_id,missing_vehicle_number, missing_vehicle_owner_name, missing_vehicle_owner_address ,missing_vehicle_make,missing_vehicle_model, lost_date_time , last_seen_date_time, last_seen_location,  reported_nic_number , missing_vehicle_description, complaint_number) values ( $1, $2, $3, $4 , $5 , $6 ,$7, $8, $9 , $10 , $11, $12)",
    [
      complaint_number,
      missing_vehicle_number,
      missing_vehicle_owner_name,
      missing_vehicle_owner_address,
      missing_vehicle_make,
      missing_vehicle_model,
      lost_date_time,
      last_seen_date_time,
      last_seen_location,
      reported_nic_number,
      missing_vehicle_description,
      complaint_number,
    ],
    (err, results) => {
      if (err) {
        console.log("Missing Vehicle" + err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createMissingPerson = async (req, res) => {
  const {
    missing_person_nic_number,
    missing_person_name,
    missing_person_address,
    lost_date_time,
    last_seen_date_time,
    last_seen_location,
    reported_nic_number,
    missing_person_description,
  } = req.body.formPersonData;
  const complaint_number = await req.body.NewComplaintId;
  client.query(
    "INSERT INTO police_complaint_missing_person (missing_person_nic_number_id,missing_person_nic_number, missing_person_name, missing_person_address , lost_date_time , last_seen_date_time, last_seen_location,  reported_nic_number , missing_person_description, complaint_number) values ( $1, $2, $3, $4 , $5 , $6 ,$7, $8, $9 , $10)",
    [
      complaint_number,
      missing_person_nic_number,
      missing_person_name,
      missing_person_address,
      lost_date_time,
      last_seen_date_time,
      last_seen_location,
      reported_nic_number,
      missing_person_description,
      complaint_number,
    ],
    (err, results) => {
      if (err) {
        console.log("Missing Person" + err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createMissingLicense = async (req, res) => {
  const {
    missing_license_number,
    last_seen_location,
    last_seen_date_time,
    lost_date_time,
    reported_nic_number,
  } = req.body.formLicenseData;

  const complaint_number = req.body.NewComplaintId;
  console.log(complaint_number);
  client.query(
    "INSERT INTO police_complaint_missing_license (police_complaint_missing_license_id,missing_license_number, last_seen_location, lost_date_time , reported_nic_number , complaint_number , last_seen_date_time) values ( $1, $2, $3, $4 , $5 , $6 , $7)",
    [
      complaint_number,
      missing_license_number,
      last_seen_location,
      lost_date_time,
      reported_nic_number,
      complaint_number,
      last_seen_date_time,
    ],
    (err, results) => {
      if (err) {
        console.log("Missing License" + err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createMissingPassport = async (req, res) => {
  const {
    missing_passport_number,
    last_seen_location,
    last_seen_date_time,
    lost_date_time,
    reported_nic_number,
  } = req.body.formPassportData;
  const complaint_number = req.body.NewComplaintId;

  client.query(
    "INSERT INTO police_complaint_missing_passport (police_complaint_missing_passport_id ,missing_passport_number, last_seen_location, lost_date_time , reported_nic_number , complaint_number , last_seen_date_time) values ( $1, $2, $3, $4 , $5 , $6 , $7)",
    [
      complaint_number,
      missing_passport_number,
      last_seen_location,
      lost_date_time,
      reported_nic_number,
      complaint_number,
      last_seen_date_time,
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

const createComplaintMissingNic = async (req, res) => {
  console.log("Missing Nic route");
  const {
    missing_nic_number,
    last_seen_location,
    last_seen_date_time,
    lost_date_time,
    reported_nic_number,
  } = req.body.formNicData;
  const complaint_number = req.body.NewComplaintId;
  console.log(complaint_number);
  client.query(
    "INSERT INTO police_complaint_missing_nic (police_complaint_missing_nic_id,missing_nic_number, last_seen_location, lost_date_time , reported_nic_number , complaint_number , last_seen_date_time) values ( $1, $2, $3, $4 , $5 , $6 , $7)",
    [
      complaint_number,
      missing_nic_number,
      last_seen_location,
      lost_date_time,
      reported_nic_number,
      complaint_number,
      last_seen_date_time,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createComplaintAssault = async (req, res) => {
  const {
    victim_nic_number,
    assault_location,
    assault_date_time,
    assaulter_nic_number,
  } = req.body.formNicData;

  const complaint_number = req.body.NewComplaintId;

  client.query(
    "INSERT INTO police_complaint_assault (police_complaint_assault_id ,victim_nic_number, assault_location, assault_datetime , assaulter_nic_number , complaint_number) values ( $1, $2, $3, $4 , $5 , $6)",
    [
      complaint_number,
      victim_nic_number,
      assault_location,
      assault_date_time,
      assaulter_nic_number,
      complaint_number,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveWantedPerson = (req, res) => {
  client.query(
    "SELECT * FROM pws_wanted_persons as pwp INNER JOIN department_nic_master as dnm ON dnm.nic_number = pwp.nic_number",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveWantedPersonByDistrictId = (req, res) => {
  const district_id = req.body.district_id;
  client.query(
    "SELECT * FROM pws_wanted_persons as pwp INNER JOIN department_nic_master as dnm ON dnm.nic_number = pwp.nic_number WHERE dnm.district_id = $1 ",
    [district_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingVehicle = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_vehicle as pcmv INNER JOIN department_vehicle_registration as dvc ON dvc.vehicle_plate_number = pcmv.missing_vehicle_number",

    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
};

const receiveMissingPerson = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_person as pcmp INNER JOIN department_nic_master as dnm ON dnm.nic_number = pcmp.missing_person_nic_number",

    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingPersonByDistrictId = (req, res) => {
  const district_id = req.body.district_id;
  console.log("District" + district_id);
  client.query(
    "SELECT * FROM police_complaint_missing_person as pcmp INNER JOIN department_nic_master as dnm ON dnm.nic_number = pcmp.missing_person_nic_number WHERE dnm.district_id = $1 ",
    [district_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingPets = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_pet",

    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingVehicleByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_vehicle as pcmv INNER JOIN department_vehicle_registration as dvc ON dvc.vehicle_plate_number = pcmv.missing_vehicle_number WHERE pcmv.reported_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
};

const receiveMyDevicesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  console.log(nic_number);
  client.query(
    "SELECT * FROM department_device_registration_portal WHERE nic_number = $1",
    [nic_number],

    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingPetsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_pet WHERE owner_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingLicenseByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_license WHERE reported_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingPassportByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_passport WHERE reported_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingNicByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_nic WHERE reported_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveAssaultByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_assault WHERE victim_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveAssaulterByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_assault WHERE assaulter_nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingPassportComplaintByNicNumber = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_passport as pcmp INNER JOIN department_passport as dp ON dp.passport_number = pcmp.missing_passport_number WHERE dp.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMissingLicenseComplaintByNicNumber = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM police_complaint_missing_license as pcml INNER JOIN department_license_master as dlm ON dlm.license_number = pcml.missing_license_number WHERE dlm.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

// Retrieving Last Records for Complaint Number are below

const retrieveLastMissingNicRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_nic ORDER BY police_complaint_missing_nic DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastMissingPassportRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_passport ORDER BY police_complaint_missing_passport_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastMissingLicenseRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_license ORDER BY police_complaint_missing_license_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastAssaultRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_assault ORDER BY police_complaint_assault_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastMissingVehicleRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_vehicle ORDER BY missing_vehicle_number_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastMyDevicesRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_my_devices ORDER BY department_device_registration_portal_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastMissingPersonRecord = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_person ORDER BY missing_person_nic_number_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveMyDevicesListByMissedNic = (req, res) => {
  client.query(
    "SELECT * FROM police_complaint_missing_person ORDER BY missing_person_nic_number_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  createMissingVehicle,
  createMissingPerson,
  createMissingLicense,
  createComplaintAssault,
  createComplaintMissingNic,
  receiveMissingLicenseByNic,
  createMissingPassport,
  receiveMyDevicesByNic,
  receiveMissingPassportByNic,
  receiveMissingNicByNic,
  receiveAssaultByNic,
  receiveAssaulterByNic,
  retrieveLastMissingNicRecord,
  retrieveLastMissingPassportRecord,
  retrieveLastMissingLicenseRecord,
  retrieveLastAssaultRecord,
  retrieveLastMyDevicesRecord,
  retrieveLastMissingVehicleRecord,
  retrieveLastMissingPersonRecord,
  receiveMissingVehicleByNic,
  receiveMyDevicesListByMissedNic,
  receiveMissingPetsByNic,

  receiveMissingPassportComplaintByNicNumber,
  receiveMissingLicenseComplaintByNicNumber,

  receiveMissingVehicle,
  receiveMissingPerson,
  receiveMissingPets,

  receiveMissingPersonByDistrictId,

  receiveWantedPerson,
  receiveWantedPersonByDistrictId,
};
