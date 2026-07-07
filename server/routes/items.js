const express = require('express')
const {handleGetItems} = require('../controller/items')

const router = express.Router();

router.get('/',handleGetItems)

module.exports = router;