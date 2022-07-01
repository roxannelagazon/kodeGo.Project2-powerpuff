//IMPORT
const express = require('express')
const multer  = require('multer')
const newConnection = require('../lib/mySqlDb.js')
// const upload = multer({ dest: 'public/uploads/' })
const addRouter = express.Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });
addRouter.get('/add', (req, res)=>{
    res.render('add',{
        header:'Add Record'
    })
   
})

//ADD DATA
addRouter.post('/update', upload.single("IMAGE"), (req, res)=>{

    let dataInput = {
        CAR_NAME: req.body.CAR_NAME,
        BRAND: req.body.BRAND,
        BODY_TYPE: req.body.BODY_TYPE,
        YEAR: req.body.YEAR,
        TRANSMISSION: req.body.TRANSMISSION,
        TYPE: req.body.TYPE,
        ENGINE: req.body.ENGINE,
        SEAT: req.body.SEAT,
        COLOR: req.body.COLOR,
        CONDITION: req.body.CONDITION,
        IMAGE: req.file.filename
    }
    let sql = 'INSERT INTO cars set ?'
    let query = newConnection.query(sql, dataInput, (err, cars)=>{
        if(err) throw err
        res.redirect('/cars')
        //res.status(202).send('Nice!')
    let sql = 'SELECT * from cars'
    })

})
module.exports = addRouter