const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cloth = require('./cloth')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        unique: [true, 'A user with the email provided already exit'],
        trim: true,
        lowercase: true,
        required: true,
        minLength: [10, 'email length should not be less than 10'],
        maxLength: [30, 'email length should not be more than 30'],
        // validate: [isEmail, 'Please enter a valid email']
    },
    
    phasionName: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        minlength: [4, 'PhasionName length must be greater than four'],
        maxlength: [15, 'PhasionName length must not be greater than fiftheen characters']
    },
    
    password: {
        type: String,
        required: true,
        maxlength: [1024, 'Password length must be greater than 10'],
        minlength: [5, 'Password length must be greater than 5'],
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{ 
    timestamps: true
})


// userSchema.virtual('clothes', {
//     ref: 'Cloth',
//     localField: '_id',
//     foreignField: 'owner'
// });

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// INSTANCE METHOD
userSchema.methods.generateAuthToken = async function(){
    try {   //generateAuthToken
        
        const user = this;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
        user.tokens = user.tokens.concat({ token });
        await user.save();
    
        console.log(token)
        return token;
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


// async function findByCredentials ==> MODEL METHOD
userSchema.statics.findByCredendials = async function(phasionName, password){
    try {
        const user = await User.findOne({ phasionName: phasionName });
        if(!user) {
            console.log('no user with this phasionName');
            // return res.send('no user with this phasionName')
            throw new Error('no user with this phasionName')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = await bcrypt.compare(user.password, password);
        
        if(!isMatch) {
                throw new Error('Password Mismatched');
        } 
        console.log(user)
        // return user;
        // req.session.user_id = user._id;
        // console.log(`from FindByCredentials THE USER IS: ${user}`);

        // else {
        //     console.log('Password Mismatched');
        //     throw new Error('Password Mismatched');
        // }


    } catch (error) {
        console.log(error);
        throw new Error('Credentials error: ' + error);
    }
}

userSchema.pre('remove', async function (next) {
    const user = this;
    
     await Cloth.deleteMany({ designer: user._id });
     next();
})


userSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})




const User = mongoose.model('User', userSchema)
// // const User = new mongoose.model('User', userSchema) // no need of "NEW"


module.exports = User;
// module.exports.validateUser = validateUser;