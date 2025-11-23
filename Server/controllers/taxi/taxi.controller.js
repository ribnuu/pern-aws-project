const client = require("../../config/db");

const receiveUberByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_uber_hire as dtsuh INNER JOIN department_taxi_services_uber_users as dtsuu ON dtsuu.department_taxi_services_users_id = dtsuh.taxi_user_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtsuu.user_phone_number WHERE dmnn.nic_number = $1 ",
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

const receiveAccountUberDetailsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_uber_users as dtsuu INNER JOIN department_taxi_services_master as dtsm ON dtsm.department_taxi_service_id = dtsuu.taxi_service_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtsuu.user_phone_number WHERE dmnn.nic_number = $1",
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

const receivePickMeByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_pickme_hire as dtsph INNER JOIN department_taxi_services_pickme_users as dtspu ON dtspu.department_taxi_services_users_id = dtsph.taxi_user_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtspu.user_phone_number WHERE dmnn.nic_number = $1 ",
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

const receiveAccountPickMeDetailsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_pickme_users as dtspu INNER JOIN department_taxi_services_master as dtsm ON dtsm.department_taxi_service_id = dtspu.taxi_service_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtspu.user_phone_number WHERE dmnn.nic_number = $1",
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

const receiveKangarooByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_kangaroo_hire as dtskh INNER JOIN department_taxi_services_kangaroo_users as dtsku ON dtsku.department_taxi_services_users_id = dtskh.taxi_user_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtsku.user_phone_number WHERE dmnn.nic_number = $1 ",
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

const receiveAccountKangarooDetailsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_kangaroo_users as dtsku INNER JOIN department_taxi_services_master as dtsm ON dtsm.department_taxi_service_id = dtsku.taxi_service_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtsku.user_phone_number WHERE dmnn.nic_number = $1",
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

const receiveTaxiyakByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_taxiyak_hire as dtsth INNER JOIN department_taxi_services_taxiyak_users as dtstu ON dtstu.department_taxi_services_users_id = dtsth.taxi_user_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtstu.user_phone_number WHERE dmnn.nic_number = $1 ",
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

const receiveAccountTaxiyakDetailsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_taxi_services_taxiyak_users as dtstu INNER JOIN department_taxi_services_master as dtsm ON dtsm.department_taxi_service_id = dtstu.taxi_service_id::integer INNER JOIN department_mobile_networks_numbers as dmnn ON dmnn.phone_number = dtstu.user_phone_number WHERE dmnn.nic_number = $1",
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

const receiveUberVehicleDetailsByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  console.log("taxi" + vehicle_number);
  client.query(
    "SELECT * FROM department_taxi_services_uber_hire WHERE vehicle_number = $1 ",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};
const receivePickMeVehicleDetailsByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  console.log("taxi" + vehicle_number);
  client.query(
    "SELECT * FROM department_taxi_services_pickme_hire WHERE vehicle_number = $1 ",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};
const receiveTaxiyakVehicleDetailsByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  console.log("taxi" + vehicle_number);
  client.query(
    "SELECT * FROM department_taxi_services_taxiyak_hire WHERE vehicle_number = $1 ",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};
const receiveKangarooVehicleDetailsByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query(
    "SELECT * FROM department_taxi_services_kangaroo_hire WHERE vehicle_number = $1 ",
    [vehicle_number],
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
  receiveUberByNic,
  receiveAccountUberDetailsByNic,
  receivePickMeByNic,
  receiveAccountPickMeDetailsByNic,
  receiveKangarooByNic,
  receiveAccountKangarooDetailsByNic,
  receiveTaxiyakByNic,
  receiveAccountTaxiyakDetailsByNic,
  receiveUberVehicleDetailsByVehicleNumber,
  receiveKangarooVehicleDetailsByVehicleNumber,
  receiveTaxiyakVehicleDetailsByVehicleNumber,
  receivePickMeVehicleDetailsByVehicleNumber,
};
