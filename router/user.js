 
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { registerUserSchema, loginUserSchema } = require('../validations/user');
const auth = require('../middleware/authentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  //@8.5.1

// Getting the current user MOSH
// router.get('/me', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select('-password');
//         res.send(user);
        
//     } catch (error) {
//         console.log(error);
//     }
// });

router.get('/me', auth, async (req, res) => {
    // const user = await User.find({});

    console.log(req.user);
    res.send(req.user);
})

router.post('/register', async (req, res) => {
    try {
        const { error } = Joi.validate(req.body, registerUserSchema);
        if(error) {
            console.log(error.details[0].message)
            return res.status(400).send({ error: error.details[0].message })
        }
    } catch (error) {
        console.log(error);
    }
    try { 
        // console.log(req.body);
        const { name, email, phasionName, password } = req.body;    
        const exitingEmail = await User.findOne({ email: email });
        if(exitingEmail) {
            console.log("user with this email already exist")
            return res.status(400).send("user with this email already exist")
        }        
        const exitingPhasionName = await User.findOne({ phasionName: phasionName });
        if(exitingPhasionName) {
            console.log("user with this phasionName already exist")
            return res.status(400).send("user with this phasionName already exist")
        }


        // const user =  new User({ name, email, phasionName, password: hashedpassword }) //.populate('owner');
        const user =  new User({ name, email, phasionName, password})
        const token = await user.generateAuthToken();
        await user.save();

        console.log('this is POST user', user);
        res.status(201).send({ user, token });
            
        // const user =  new User({ ...req.body });               
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message}); //.json({message: error.message})
    }
})



router.post('/login', async (req, res) => {
    try {
        const { error } = Joi.validate(req.body, loginUserSchema);
        if(error) {
            console.log(error.details[0].message)
            return res.status(400).send({ error: error.details[0].message })
        }
    } catch (error) {
        console.log(error);
    }

    const { phasionName, password } = req.body;
    try {
        const user = await User.findOne({ phasionName: phasionName });
        if(!user) {
            console.log('no user with this phasionName');
            // return res.send('no user with this phasionName')
            throw new Error('no user with this phasionName')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
                throw new Error('Password Mismatched');
        } 
        // const user = await User.findByCredendials(phasionName, password);
        const token = await user.generateAuthToken();
        
        await user.save();

        console.log({user, token});
        res.send({ user, token });

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
        // res.status(400).send('unable to log in', error)
    }
})

router.post('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        return res.status(200).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.patch('/me', auth, async(req, res) => {
    try {
        const { error } = Joi.validate(req.body, registerUserSchema);
        if(error) {
            console.log(error.details[0].message)
            return res.status(400).send({ error: error.details[0].message })
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const { name, email, phasionName, password } = await req.body;
        // const hashedPassword = await bcrypt.hash(password, 8);
        // const user = await User.findByIdAndUpdate(req.user._id, 
        //     { 
        //         name, 
        //         email, 
        //         phasionName, 
        //         password
        //         // password: hashedPassword 
        //     }, 
        //     { new: true, runValidators: true })

        const user = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, {new: true, runValidators: true })
        if(!user) {
            console.log('USER MISMATCHED !')
            res.send('USER MISMATCHED')
        }
        req.user = user;
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)  //send({ error: "User not available"})
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user) return res.status(401).send('User not found');
        console.log(`user with phasionName ${user.phasionName} has been deleted`)
        res.send(user);

    } catch (error) {
        res.status(500).send(error);
    }
})



module.exports = router;




// router.post('/signin', async (req, res) => {   
//     try {
//         const { error } = Joi.validate(req.body, loginUserSchema);
//         if(error) {
//             console.log(error.details[0].message)
//             return res.status(400).send({ error: error.details[0].message })
//         }
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }

//     try {
//         const { name, email, phasionName, password } = req.body;

//         const user = await User.findOne({ phasionName });
//         if(!user) {
//             console.log('User with this Phasioname NOT FOUND');
//             return res.status(400).send('User with this PhasionName NOT FOUND')
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if(!isValidPassword){

//             console.log('Invalid Password');
//             return res.status(400).send("Invalid Password");
//         } 

//         const token = jwt.sign({ _id: user._id }, tok);
        
//         user.tokens = user.tokens.concat({ token });
//         console.log(`you are logged in with ${user.name} with ${token}............`)
//         await user.save();

//         res.send({ user, token });
//         // res.header('auth-token', token).send({ token, user });

//         // res.send(`you are logged in with ${user.name} `)
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// })

// WE DONT NEED THIS ROUTE AGAIN
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;

//     const user = await User.findById(id) //.populate('owner');

//     if(!user) {
//         return res.status(404).send("user not found");
//     }

//     console.log(user);
//     res.status(201).json({ user })
// })


        // const exitingUser = await User.find()
        //     .or([{ email: email}, { phasionName: phasionName }])
        // if(exitingUser) {
        //     console.log("user with this email or phasionName is already registered");
        //     return res.status(400).send("user with this email or phasionName is already registered");
        // } 