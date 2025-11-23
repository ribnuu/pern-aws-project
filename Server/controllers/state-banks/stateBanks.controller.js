const client = require("../../config/db");

const receiveAccountByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  try {
    client.query(
      "SELECT * FROM department_state_bank_accounts as dsba INNER JOIN department_bank_master as db ON db.department_bank_id = dsba.bank_id::integer WHERE dsba.nic_number = $1",
      [nic_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const receiveBankStatementByAccountNumber = (req, res) => {
  const account_number = req.body.data.accountNumber;
  const start_date = req.body.data.startDate;
  const end_date = req.body.data.endDate;
  try {
    client.query(
      "SELECT * FROM department_bank_transaction AS dbt INNER JOIN department_state_bank_accounts AS dsba ON dbt.account_number = dsba.account_number WHERE dbt.account_number = $1 AND dbt.transaction_date BETWEEN $2 AND $3",
      [account_number, start_date, end_date],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const receiveAccountsDetailsByAccountNumber = (req, res) => {
  const account_number = req.body.data.accountNumber;
  const start_date = req.body.data.startDate;
  const end_date = req.body.data.endDate;
  try {
    client.query(
      "SELECT * FROM department_bank_master AS db INNER JOIN department_state_bank_accounts AS dsba ON db.department_bank_id::integer = dsba.bank_id::integer WHERE dsba.account_number = $1",
      [account_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const receiveAccount = (req, res) => {
  const account_number = req.body.account_number;
  try {
    client.query(
      "SELECT * FROM department_state_bank_accounts WHERE account_number = $1",
      [account_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(results.rows.length);
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  receiveAccountByNic,
  receiveAccount,
  receiveBankStatementByAccountNumber,
  receiveAccountsDetailsByAccountNumber,
};
