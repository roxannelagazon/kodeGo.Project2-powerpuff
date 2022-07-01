//IMPORT
const express = require('express')
const multer  = require('multer')
const newConnection = require('../lib/mySqlDb.js')
// const upload = multer({ dest: 'public/uploads/' })
const usersRouter = express.Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });
usersRouter.get('/users', (req, res)=>{
        res.render('users',{
        header:'users'
    })
   
})
module.exports = usersRouter