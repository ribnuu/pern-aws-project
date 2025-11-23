const client = require('../../config/db')
//
//     --- You can also write controllers like this as well
// const query = `
//     SELECT *
//     FROM department_nic_master AS dnm
//     INNER JOIN table1 AS t1 ON dnm.column1 = t1.column1
//     INNER JOIN table2 AS t2 ON dnm.column2 = t2.column2
//     WHERE dnm.nic_number = $1;
//   `;
//   client.query(query, [nicNumber], (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(results.rows);
//       // Handle the  joined data here
//     }
//   });
//

const receivePassport =  async (req , res) => {
    const passport_number = req.body.passport_number
    console.log(passport_number)
    client.query('SELECT * FROM department_passport WHERE passport_number = $1' , [passport_number] , (err , results) => {
        if(err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
}

const receivePassportMissingDataByPassportNumber = (req,res) => {
    const passport_number = req.body.passport_number;
    client.query('SELECT * FROM police_complaint_missing_passport WHERE missing_passport_number = $1',[passport_number],(err,results) => {
      if(err){
        console.error(err)
      } else {
        res.send(results)
      }
    })
  }

  const receivePassportMissingDataByReportedBy = (req,res) => {
    const nic_number = req.body.nic_number;
    client.query('SELECT * FROM police_complaint_missing_passport WHERE reported_nic_number = $1',[nic_number],(err,results) => {
      if(err){
        console.error(err)
      } else {
        res.send(results)
      }
    })
  }


const receiveAllData = (req,res) => {
    const passport_number = req.body.passport_number;
    client.query('SELECT * FROM department_passport WHERE passport_number = $1' , [passport_number] , (err , results) => {
        if(err){
            console.error(err)
        }else {
            res.send(results.rows)
        }
    })
}

const receiveAlterationsData = (req,res) => {
    const passport_number = req.body.passport_number;
    client.query('SELECT * FROM department_passport AS dp INNER JOIN department_passport_alterations AS dpa ON dp.passport_number = dpa.passport_number WHERE dp.passport_number = $1' , [passport_number] , (err , results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results.rows);
        }
    })
}

const receiveReasonData = (req,res) => {
     const passport_number = req.body.passport_number;
    client.query('SELECT * FROM department_passport AS dp INNER JOIN department_passport_reasons AS dpr ON dp.passport_number = dpr.passport_number WHERE dp.passport_number = $1' , [passport_number] , (err , results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results.rows);
        }
    })
}

const receivePassportByNic = async (req , res) => { 
    const nic_number = req.body.nic_number;
    console.log(nic_number)
    client.query('SELECT * FROM department_passport WHERE nic_number = $1' , [nic_number] , (err , results) => {
        if(err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
}

module.exports = {
    receivePassportMissingDataByPassportNumber,
    receivePassportMissingDataByReportedBy,
    receivePassport,
    receiveAllData,
    receiveAlterationsData,
    receiveReasonData,
    receivePassportByNic
}