const express = require('express')
const multer  = require('multer')
const newConnection = require('../lib/mySqlDb.js')
const bodyParser = require('body-parser')

input = bodyParser.urlencoded({ extended: false })
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });

var getId
const editRouter = express.Router()
editRouter.use(bodyParser.json())
editRouter.use(bodyParser.urlencoded({ extended: false }))
editRouter.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM cars WHERE ID = ${id}`
    let query = newConnection.query(sql, (err, cars) => {
        if (err) throw err;
        res.render('edit', {
            records: cars[0],
            header: 'Edit Records'
        })
    })
    getId = id
})
editRouter.post('/save', upload.single("IMAGE"), (req, res) => {
        const CAR_NAME = req.body.CAR_NAME
        const BRAND = req.body.BRAND
        const BODY_TYPE = req.body.BODY_TYPE
        const YEAR = req.body.YEAR
        const TRANSMISSION = req.body.TRANSMISSION
        const TYPE = req.body.TYPE
        const ENGINE = req.body.ENGINE
        const SEAT = req.body.SEAT
        const COLOR = req.body.COLOR
        const CONDITION = req.body.CONDITION

        if(typeof req.file === 'undefined') {
            var IMAGE = req.body.OLDIMAGE
        } else {
            var IMAGE = req.file.filename
        }
        

    let sql = "UPDATE `cars` SET `CAR_NAME` = '"+ CAR_NAME +"', `BRAND` = '"+ BRAND +"',`BODY_TYPE` = '"+ BODY_TYPE +"', `YEAR`= '"+ YEAR +"', `TRANSMISSION`  = '"+ TRANSMISSION +"', `TYPE` = '"+ TYPE +"', `ENGINE` = '"+ ENGINE +"', `SEAT` = '"+ SEAT +"', `COLOR`= '"+ COLOR +"', `CONDITION` = '"+ CONDITION +"', `IMAGE` = '"+ IMAGE +"' WHERE `cars`.`ID` = '"+ getId +"'"
        console.log(sql)
    let query = newConnection.query(sql, (err, cars) => {
        res.redirect('/cars')
    })

})
module.exports = editRouter