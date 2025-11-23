const client = require('../../config/db');

const receiveByNic = (req , res) => {
    const nic_number = req.body.nic_number
    client.query('SELECT * FROM department_inland_revenue WHERE taxpayer_nic = $1' , [nic_number] , (err,results) => {
        if(err){
            console.error(err)
        }else{
            console.log(results.rowCount)
            res.send(results);
        }
    })
}

module.exports = {
    receiveByNic
}
