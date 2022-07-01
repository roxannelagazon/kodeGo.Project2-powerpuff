//IMPORT
const express = require('express')
const multer  = require('multer')
const newConnection = require('../lib/mySqlDb.js')
// const upload = multer({ dest: 'public/uploads/' })
const addusersRouter = express.Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });
addusersRouter.get('/adduser', (req, res)=>{
    res.render('adduser',{
    header:'Add Users'
    })
   
})

//ADD DATA
addusersRouter.post('/userupdate', upload.single("IMAGE"), (req, res)=>{

    let dataInput = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birthday: req.body.birthday,
        country: req.body.country,
        position: req.body.position,
        password: req.body.password,  
    }
    if(typeof req.file === 'undefined') {
      dataInput.picture = "placeholder.png"
    } else {
      dataInput.picture = req.file.filename
    }
    let sql = 'INSERT INTO users set ?'
    let query = newConnection.query(sql, dataInput, (err, users)=>{
        if(err) throw err
        res.redirect('/users')
        // res.status(202).send('Nice!')
    let sql = 'SELECT * from users'
    })

})
module.exports = addusersRouter