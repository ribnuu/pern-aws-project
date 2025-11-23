const client = require("../../config/db");

const createSchoolRecord = (req,res) => {

    const {citizen_code_number , school_name ,school_index , start_date , end_date} = req.body.formData;
    client.query("INSERT INTO department_child_school_services(citizen_code_number , school_name , school_index , start_date , end_date) VALUES($1 , $2 , $3 , $4 , $5)" , [citizen_code_number , school_name , school_index , start_date , end_date] , (err,results) => {
        if(err){
            console.error(err);
        } else {
            res.send(results);
        }
    })
}



module.exports = {
    createSchoolRecord
};
