const client = require('../../config/db');

const receiveByCodeNumber = (req,res) => {
    const citizen_code_number = req.body.citizen_code_number;
    client.query(
        'SELECT * FROM department_nic_master WHERE citizen_code_number = $1',[
            citizen_code_number
        ] , (err,results) => {
            if(err){
                console.error(err)
            } else {
                console.log(citizen_code_number)
                res.send(results)
            }
        }
    )

}

module.exports = {
    receiveByCodeNumber
}