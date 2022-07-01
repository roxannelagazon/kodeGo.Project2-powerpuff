//IMPORT
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const newConnection = require('./lib/mySqlDb.js')
const addRouter = require('./routes/add.js')
const editRouter = require('./routes/edit.js')
const usersRouter = require('./routes/users.js')
const addusersRouter = require('./routes/adduser.js')
const editusersRouter = require('./routes/editusers.js')
const carsRouter = require('./routes/view.js')
const userviewRouter = require('./routes/uview.js')
const session = require('express-session');
const path = require('path');

const port = 3000
const app = express()
 
//MIDDLEWARE AND VIEWS
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/public/')); 

function authCheck(req, res, next) {
    if(!req.session.loggedin) {
        return res.render('login')
    } else {
        next()
    }    
}
//ROUTES
app.use('/', addRouter)
app.use('/', editRouter)
app.use('/', addusersRouter)
app.use('/', editusersRouter)
app.use('/', carsRouter)
app.use('/', userviewRouter)

//PULL ALL RECORDS

//LogIn----


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.post('/auth', function(req, res) {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;

    const saltRounds = 10;

	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		newConnection.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			results.forEach(result => {
                req.session.name = result.first_name +' '+ result.last_name;
            });
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				//req.session.name = username;
				// Redirect to home page
				res.redirect('/');
			} else {
				res.redirect('/login');
			}					
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


app.get('', authCheck,(req, res)=> {
    let sql = 'SELECT COUNT(*) as x from cars'
    let query = newConnection.query(sql,(err, cars)=>{
        if(err) throw err
        res.render('index', {
            header:'Cars',
            user: req.session.name,
            cars: cars,
            isAdd: false 
        })
    })
})
app.get('/cars', authCheck,(req, res)=>{
    let sql = 'SELECT * from cars'
    let query = newConnection.query(sql,(err, cars)=>{
        if(err) throw err
        // res.json(cars)
        res.render('cars', {
            header:'Cars',
            records: cars,
            isAdd: false
        })
    })
})
app.get('/users', authCheck,(req, res)=>{
    let sql = 'SELECT * from users'
    let query = newConnection.query(sql,(err, users)=>{
        if(err) throw err
        // res.json(cars)
        res.render('users', {
            header:'Users',
            records: users,
            isAdd: false
        })
    })
})


//


app.get('/login', (req, res)=> {
	// Render login template
    if(!req.session.loggedin) {
        return res.render('login')
    } else {
        res.redirect('/')
    }
	
});
app.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/')
});

//DELETE DATA
app.get('/delete/:id',authCheck,(req, res) => {
    const id = req.params.id
    let sql = `DELETE FROM cars WHERE ID=${id}`
    let query = newConnection.query(sql, (err, cars) => {
        if (err) throw err
        res.redirect('/cars');
    })
})

//DELETE DATA
app.get('/users/delete/:id',authCheck,(req, res) => {
    const id = req.params.id
    let sql = `DELETE FROM users WHERE userId=${id}`
    let query = newConnection.query(sql, (err, cars) => {
        if (err) throw err
        res.redirect('/users');
    })
})

//CONNECTION CHECKING
newConnection.connect(function(error) {
    try {
        console.log('Connection to the database is Successfull!')
    } catch (err) {
        console.log(err)
    }
})
app.listen(process.env.PORT || port, function() {
    console.log(`Port is now running at ${port}`)
})
