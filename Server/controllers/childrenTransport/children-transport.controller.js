const client = require("../../config/db");


const receiveTransportChildByNic = (req,res) => {
  const nic_number = req.body.nic_number;
  console.log(nic_number)

  client.query("SELECT * FROM department_transport_services_children as dtsc INNER JOIN department_birth_certificate as dbc ON dbc.citizen_code_number = dtsc.children_citizen_code_number INNER JOIN department_transport_services_driver_vehicle as dtsdv ON dtsdv.vehicle_number = dtsc.vehicle_number INNER JOIN department_transport_services as dts ON dts.department_transport_services_id = dtsdv.transport_service_id::integer WHERE dbc.father_nic_number = $1 OR dbc.mother_nic_number = $2" , [nic_number , nic_number] , (err,results) => {
    if(err){
      console.error(err)
    } else {
        console.log(results.rows)
      res.send(results)
    }
  }) 
}

module.exports = {
  receiveTransportChildByNic
};
