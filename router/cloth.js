const express = require('express');
const router = express.Router();
const Cloth = require('../models/cloth');
const auth = require('../middleware/authentication');
const { registerClothSchema } = require('../validations/cloth');
const Joi = require('@hapi/joi');
const User = require('../models/user');

const cloudinary = require('cloudinary').v2;

const multer = require('multer');

// Replace these values with your Cloudinary account credentials
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });


const upload = multer({ dest: 'uploads/' });

router.put('/update/clothImage/:id', auth, upload.single('image'), async (req, res) => {
  try {

        // UPLOAD IMAGE TO CLOUDINARY
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Phasionistar-API/'
          });
    // RETRIEVE THE SECURE URL OF THE UPLOADER IMAGE
    const secureUrl = result.secure_url;
    const updateClothImage = {
        $set: { clothImage: secureUrl }
      };

     const cloth = await Cloth.findByIdAndUpdate({_id: req.params.id}, updateClothImage)
     
     cloth.save()
    res.status(200).json({ secureUrl });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Image upload failed.' });
  }
});






// router.get('/test', auth, (req, res) => {
//     res.send(req.user);
//     const user = User.findOne({ _id: req.user });
// })

// GET ALL CLOTH MEASURENT
router.get('/', auth, async(req, res) => {
    try {
        const clothes = await Cloth.find({ designer: req.user._id });
        // await req.user.populate('clothes').execPopulate()

        clothes.forEach((cloth) => {
            console.log(cloth.ownerName.toUpperCase());
        })
        res.status(200).json({clothes});
    } catch (error) {
        console.log('MESSAGE :', error)
        res.status(500).json({message: error.message})
    }
})

// router.get('/:id', async (req, res) => {
//     const { id } = req.params;

//     const cloth = Cloth.findById(id);

// })


router.post('/', auth, async(req, res) => {
    try { // VALIDATION PROCESS
        const { error } = Joi.validate(req.body, registerClothSchema);
        if(error) {
            console.log(error.details[0].message)
            return res.status(400).send({ error: error.details[0].message })
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }

    try {
        // const { ownerName, contact, price, deposit, deliveryDate, measurements, leg, neck, waist, shoulder, arm,  chest, bicep, wrist, back, stomach, hip, thigh } = req.body
        // const cloth = new Cloth({ ownerName, contact, price, deposit, deliveryDate, measurements, clothImages, leg, neck, waist, shoulder, arm,  chest, bicep, wrist, back, stomach, hip, thigh, designer: req.user._id }) //.populate('owner');
        const cloth = new Cloth({ ...req.body, designer: req.user._id })
        await cloth.save();
    
        console.log(cloth);
        res.status(201).send(cloth);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
            // message: properties.message
        })
    }
})

//GET ONE CLOTH MEASUREMENTS
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const cloth = await Cloth.findOne({ id, designer: req.user._id });
        if(!cloth) return res.status(404).send('Task not Available');
        // .populate('owner');
        // const user = User.findOne({ _id: req.user._id })
        console.log(cloth);
        // console.log(user);
        res.status(200).send({cloth});
        // res.status(200).json({cloth});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', auth, async(req, res) => {
    try {
        const { id } = req.params;
        // const cloth = await Cloth.findOne({ _id: id, designer: req.user._id })
        const cloth = await Cloth.findOneAndUpdate({ id, designer: req.user._id }, { ...req.body }, { new: true, runValidators: true });

        if(!cloth) {
            console.log(`cloth with this id ${id} is not available.`)
            res.status(404).json({ message: `cloth with this id ${id} is not available.` })
        }
        cloth.save();
        console.log(cloth);
        res.status(205).json({cloth});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})

    }

})

router.delete('/:id', auth, async(req, res) => {
    const { id } = req.params;
        try {
            // const cloth = await Cloth.findByIdAndDelete(id);
            const cloth = await Cloth.findOneAndDelete({ id, owner: req.user._id });

        if(!cloth) {
            console.log(`cloth with this id ${cloth._id} is not available.`)
            res.status(404).json({ message: `cloth with this id ${id} is not available.` })    
        }
        console.log(`${cloth.ownerName}'s Measurement Deleted`)
        res.status(200).json({cloth});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})


module.exports = router;
