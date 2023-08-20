const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const cookies = req.cookies
        if(!cookies.jwt) return res.status(401).send('Access denied, No token provided');
       const token = cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user) {
            console.log('User not found');
            throw new Error('User not found');
            // res.clearCookie('jwt', { httpOnly: true });
        }

        // res.cookie('jwt', token, {
        //      httpOnly: true,
        //     //  secure: true,
        //     //  maxAge: 1000000,
        //     //  signed: true
        //      });

        req.token = token;
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Please Authenticate.' });
    }
    // console.log('AUTH IN MIDDLEWARE');
    // next();
}

// const auth = async function (req, res, next) {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if(!token) return res.status(401).send('Access Denied');

//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
//         req.user = user;
//         next();

//     } catch (error) {
//         console.log(error);
//         res.status(401).send('Invalid Token, User not Authenticated');
//     }
// }

module.exports = auth;