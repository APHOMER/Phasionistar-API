// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }


const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors'); // SHOULD BE BEFORE ALL APIs
app.use[cors({ origin: 'https://localhost:4000', credentials: true })];

const db = require('./db/mongoose');
const userRouter = require('./router/user');
const clothRouter = require('./router/cloth');
const homeRouter = require('./router/home');

const port = process.env.PORT || 5000;


// MIDDLEWARES.........
app.use(bodyParser.urlencoded({ extended: false })); // x-ww-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cors({
    origin: "http://localhost:3000"
}));

// CORS SETTINGS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // X-HTTP-Method-Override
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// ALTERNATIVE
// app.use(
//     cors({
//         allowedHeaders: "*",
//         allowMethods: "*",
//         origin: "*"
//     })
// );

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/cloth', clothRouter);







app.listen(port, () => {
    console.log(`PHASIONISTAR-API is running on port ${port}`)
})

// /users/USER/Desktop/coded/mongodbzip/bin/mongod.exe --dbpath=/users/USER/DESKTOP/DATABASES/API-PHASIONISTARDB
