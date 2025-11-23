const client = require('../../config/db')


const receiveByNic = (req,res) => {
    const nic_number = req.body.nic_number
    client.query('SELECT * FROM department_excise WHERE owner_nic_number = $1' , [nic_number] , (err , results) => {
        if(err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
}

module.exports = {
    receiveByNic
}