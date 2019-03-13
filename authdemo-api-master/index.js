const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

/*
starta med SECRET=abc123 nodemon index.js
*/

// ROUTES
let auth = require('./routes/auth');
let users = require('./routes/users');
let products = require('./routes/products');


// SETUP DB CONNECTION
const dbUrl =  ""
const dbUser = '';
const dbPass = '';

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}`, { useNewUrlParser: true })
.then(() => console.log('connected.'))
.catch(err => console.error(err.stack))


// INIT EXPRESS
let App = express();
App.use(express.json());

App.use(cors()); // DEV

App.listen(3000, () => console.log('API listening on port 3000.'));


// Auth Middleware
App.use((req, res, next) => {

    console.log(req.headers);

    if(auth.verifyToken(req.headers.authorization)){
        next()
    } else {
        res.status(403).send('Access Denied.')
    }

})

// ROUTES
App.route('/auth')
.post(auth.post)

App.route('/users')
.post(users.post)

App.route('/products')
.get(products.get)
