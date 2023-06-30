// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }


const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');

const db = require('./db/mongoose');
const userRouter = require('./router/user');
const clothRouter = require('./router/cloth');


const port = process.env.PORT || 5000;


// MIDDLEWARES.........
app.use(bodyParser.urlencoded({ extended: false })); // x-ww-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(cors());
// CORS SETTINGS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// })

app.use('/user', userRouter);
app.use('/cloth', clothRouter);







app.listen(port, () => {
    console.log(`phasion-api is running on port ${port}`)
})

// /users/USER/Desktop/coded/mongodbzip/bin/mongod.exe --dbpath=/users/USER/DESKTOP/DATABASES/PHASIONISTARDB