const client = require("../../config/db");

const createSchool = (req,res) => {
console.log("hiiiiiiiii+++++++++++++++");
    const { 
        district, school_name
    } = req.body.formData;
    console.log(req.body.formData);

    client.query("INSERT INTO department_education_school(school_id, district , school_name, created_at) VALUES($1 , $2, $3, $4 )" , 
    [district , school_name ] , 
    (err,results) => {
        if(err){
            console.error("error ======>>>>>",err);
        } else {
            res.send(results);
            console.log("results========>>>>>", results);
        }
    })
}



module.exports = {
    createSchool
};
