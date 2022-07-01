const express = require('express')
const newConnection = require('../lib/mySqlDb.js')
const bodyParser = require('body-parser')
const userviewRouter = express.Router()

userviewRouter.use(bodyParser.json())
userviewRouter.use(bodyParser.urlencoded({ extended: false }))

userviewRouter.get('/users/view/:id', (req, res)=>{
    const id = req.params.id;
    let sql = `SELECT * FROM users WHERE userId=${id}`
    
    let query = newConnection.query(sql,(err, users)=>{
        if(err) throw err
        // res.json(users)
        res.render('uview', {
            header:'User Details',
            users: users[0],
            isAdd: false
        })
    })
})
module.exports = userviewRouter