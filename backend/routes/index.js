const express = require('express')
const router = express.Router()

//Route
router.get('/',(req, res) => {
    res.json({message: 'Welcome to Checked!'})
})

module.exports = router