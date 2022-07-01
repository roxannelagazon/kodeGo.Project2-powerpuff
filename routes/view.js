//IMPORT
const express = require('express')
const newConnection = require('../lib/mySqlDb.js')
const bodyParser = require('body-parser')
const carRouter = express.Router()

carRouter.use(bodyParser.json())
carRouter.use(bodyParser.urlencoded({ extended: false }))

carRouter.get('/view/:id', (req, res)=>{
    const id = req.params.id;
    let sql = `SELECT * FROM cars WHERE ID=${id}`
    
    let query = newConnection.query(sql,(err, cars)=>{
        if(err) throw err
        // res.json(cars)
        res.render('views', {
            header:'Car Details',
            records: cars[0],
            isAdd: false
        })
    })
})
module.exports = carRouter