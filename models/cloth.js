const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});


// ImageSchema.virtual('thumb').get(function() {
ImageSchema.virtual('thumbnail').get(function() {
    this.url.replace('/upload', '/upload/w_200');
});

const ClothSchema = new Schema ({
    ownerName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 16,
        unique: true
    },
    designer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contact: {
        type: String,
        required: false,
        minLength: [8, 'is shorter than the minimum allowed length (8)'],
        maxLength: [11, 'is longer than the maximum length (11) allowed']
    },
    clothImages:[ImageSchema],
    measurements: {
        type: String,
        enum: ['inches', 'centimeter', 'meter'],
        default: 'inches',
        required: true
    },
    price: {
        type: Number,
        min: [0, 'price can not be less than zero(0)'],
        max: [10000000, 'this is too much, are you a Ritualist?'],
        required: true
    },
    deposit: {
        type: Number,
        min: 0,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: [true, 'Kindly add delivery date'],
        format: "dd-MM-yyyy", 
        default: Date.now,
        // min: date.now
    },
    leg: {
        type: Number,
        required: true
    },
    neck: {
        type: Number,
        required: true
    },
    waist: {
        type: Number,
        required: true
    },
    shoulder: {
        type: Number,
        required: true
    },
    arm: {
        type: Number,
        required: true
    },
    chest: {
        type: Number,
        required: true
    },
    bicep: {
        type: Number,
        required: true
    },
    wrist: {
        type: Number,
        required: true
    },
    back: {
        type: Number,
        required: true
    }, 
    stomach: {
        type: Number,
        required: true
    }, 
    hip: {
        type: Number,
        required: true
    }, 
    thigh: {
        type: Number,
        required: true
    },
},
{ 
    timestamps: true
}
)

// function validateCloth(cloth) {
//     const schema = {
        // ownerName: Joi.string().trim().lowercase().min(3).max(16).required(),
//         name: Joi.string().trim().lowercase().min(3).max(16).required(),
//         contact: Joi.string().required(),
//         price: Joi.number().min(0).max(1000000).required()
//     }

//     return Joi.validate(cloth, schema);
// }


module.exports = mongoose.model('Cloth', ClothSchema);
// module.exports.validateCloth = validateCloth;