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
const editusersRouter = express.Router()
editusersRouter.use(bodyParser.json())
editusersRouter.use(bodyParser.urlencoded({ extended: false }))
editusersRouter.get('/editusers/:id', (req, res) => {
    const userId = req.params.id;
    let sql = `SELECT * FROM users WHERE userId = ${userId}`
    let query = newConnection.query(sql, (err, users) => {
        if (err) throw err;
        res.render('editusers', {
            users: users[0],
            header: 'Edit User'
        })
    })
    getId = userId
})
editusersRouter.post('/usave', upload.single("IMAGE"), (req, res) => {
     
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const birthday = req.body.birthday
        const country = req.body.country
        const position = req.body.position
        const password = req.body.password

        if(typeof req.file === 'undefined') {
            var IMAGE = req.body.OLDIMAGE
        } else {
            var IMAGE = req.file.filename
        }
        

    let sql = "UPDATE `users` SET `first_name` = '"+ first_name +"', `last_name` = '"+ last_name +"',`email` = '"+ email +"', `birthday`= '"+ birthday +"', `country`  = '"+ country +"', `position` = '"+ position +"', `picture` = '"+ IMAGE +"', `password` = '"+ password +"' WHERE `users`.`userId` = '"+ getId +"'"
    let query = newConnection.query(sql, (err, user) => {
        res.redirect('/users')
    })

})
module.exports = editusersRouter