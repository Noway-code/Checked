const express = require('express')
const router = express.Router()

//Route
router.get('/',(req, res) => {
    res.json({message: 'Welcome to Checked!'})
})
router.get('/test',(req, res) => {
    res.json({message: 'This also works!'})
})



module.exports = router