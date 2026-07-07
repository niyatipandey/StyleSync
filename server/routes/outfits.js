const express = require('express')
const {handlePostOutfit} = require('../controller/outfits')
const checkAuth = require('../middleware/auth')

const router = express.Router();

router.post('/',checkAuth,handlePostOutfit)

module.exports = router;