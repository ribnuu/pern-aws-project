const client = require("../config/db");

const multer = require('multer');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      const newFilename = uniqueSuffix + '.' + extension;
      cb(null, newFilename);
    },
  });
  
 
  const upload = multer({ storage: storage })

  const getComplaints = (req, res) => {
    try {
          client.query('SELECT * FROM complaint' , (err , results) => {
            if(!err){
              console.log(results.rows)
              res.send(results.rows)
            } else {
              console.log(err)
            }
        })
    } catch (error) {
      console.log(error) 
    }
  }

  const setComplaint = (req, res) => {
    console.log('Post route detected')
    console.log(req.body)
    const { incident, location, people_around } = req.body.formData;

  try {
    client.query('INSERT INTO complaint (incident, location, people_around) VALUES ($1, $2, $3)', [incident, location, people_around]);
    res.status(200).json({ message: 'Complaint inserted successfully' });
  } catch (error) {
    console.log('Error inserting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const addImagesToComplaint = (req,res) => {

  const newFilenameReq = req.file.filename
  const complaint_id  = 5;
  try {
    console.log(newFilenameReq)
    client.query('INSERT INTO complaint_images (complaint_id, filename) VALUES ($1, $2)', [complaint_id, newFilenameReq]);
  } catch (error) {
    console.log(error);
    
  }
}

const viewImages = (req , res) => {
  try {
    client.query('SELECT * FROM complaint_images' , (err , results) => {
      if(!err){
        console.log(results.rows)
        res.send(results.rows);
      } else {
        console.log(err)
      }
    })
    
  } catch (error) {
    console.log(error);
  }
}


  module.exports = {
    getComplaints, 
    setComplaint,
    addImagesToComplaint,
    viewImages
  }