const client = require("../../config/db");

const receiveMyDevicesListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_missing_person WHERE nic_number = $1",
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

const receiveMissingPetListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_missing_pet WHERE nic_number = $1",
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

const receiveMissingVehicleListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_missing_vehicle as pmv INNER JOIN department_vehicle_registration as dvr ON pmv.license_plate_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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

const receiveWantedPersonListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_wanted_persons WHERE nic_number = $1",
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

const receiveBlacklistedPhonesListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_blacklisted_phones WHERE nic_number = $1",
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

const receiveEmergencyHandlerByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_emergency_handler as peh INNER JOIN department_mobile_networks_numbers as dmnn ON peh.phone_number = dmnn.phone_number INNER JOIN department_mobile_networks_master as dmnm ON dmnm.mobile_network_id = dmnn.network_id  WHERE dmnn.nic_number = $1",
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

const receiveMissingOtherItemsListByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_missing_other_items WHERE nic_number = $1",
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

const receiventryBanDetectionByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_entry_ban_detection AS pebd INNER JOIN department_passport as dp ON dp.passport_number = pebd.passport_number WHERE dp.nic_number = $1",
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

const receiveNumberPlateMismatchByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_number_plate_mismatch as pnpm INNER JOIN department_vehicle_registration as dvr ON dvr.vehicle_plate_number = pnpm.vehicle_number WHERE dvr.nic_number=$1",
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

const receiveUnavailableNumberPlateByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_unavailable_number_plate WHERE nic_number = $1",
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

const receiveFindPersonOrVehicleByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_find_person_or_vehicle WHERE nic_number = $1 ",
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

const receiveAbnormalCrowdDetectionByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_abnormal_crowd_detection WHERE nic_number = $1 ",
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

const receiveSuspectedTreasureHuntersByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM pws_suspected_treasure_hunters WHERE nic_number = $1 ",
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

module.exports = {
  receiveMyDevicesListByNic,
  receiveMissingPetListByNic,
  receiveMissingVehicleListByNic,
  receiveWantedPersonListByNic,
  receiveBlacklistedPhonesListByNic,
  receiveEmergencyHandlerByNic,
  receiveMissingOtherItemsListByNic,
  receiventryBanDetectionByNic,
  receiveNumberPlateMismatchByNic,
  receiveUnavailableNumberPlateByNic,
  receiveFindPersonOrVehicleByNic,
  receiveAbnormalCrowdDetectionByNic,
  receiveSuspectedTreasureHuntersByNic,
};
