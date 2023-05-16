const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send("it will listen a post request on /api/auth/ and create user of that and it don't require authnetication")
});

module.exports = router;