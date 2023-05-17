const express = require('express');
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();

router.post('/createUser',[
    body('name',"Enter valid name").isLength({min:3}),
    body('email',"Invalid email").isEmail(),
    body('password',"Password must of length greater than or equal to 8").isLength({min:8})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let user = await User.findOne({email:req.body.email});
    if (user){
      return res.status(400).json({"error":"This email is already registered"});
    }
    
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email:req.body.email
    });

    return res.json(user);
});

module.exports = router;