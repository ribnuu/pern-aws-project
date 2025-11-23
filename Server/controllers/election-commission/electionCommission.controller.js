const client = require("../../config/db");

const receiveElectionCommissionByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_election_commission AS dec INNER JOIN department_election_party as dep ON dec.contester_party::integer = dep.department_party_id WHERE dec.nic_number = $1 ORDER BY dec.election_year DESC",
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
  receiveElectionCommissionByNic,
};
