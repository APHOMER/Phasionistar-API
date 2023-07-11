const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('This is PHASIONISTAR API');
    res.send('This is PHASIONISTAR API');
})




module.exports = router;