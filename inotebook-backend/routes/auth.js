const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();
const secret_key = "Anupam loves mustang, supra, GTR, camaro";


//Route1 : createUser: no login required
router.post('/createUser', [
  body('name', "Enter valid name").isLength({ min: 3 }),            // validating 
  body('email', "Invalid email").isEmail(),
  body('password', "Password must of length greater than or equal to 8").isLength({ min: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // checking email is already registered or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ "error": "This email is already registered" });
    }

    // creating hash for the password
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);

    // creating user
    user = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email
    });

    
    const data = {
      user:{
        id:user.id
      }
    }

    // sending token to user
    const authToken = jwt.sign(data,secret_key);
    res.json(authToken);
  }
  catch (error) {
    return res.status(500).send("Some error occured");
  }
});


// Route2: do login; no login required
router.post('/login',[
  body("email","Enter a valid email").isEmail(),
  body("password","Password can't be empty").exists()
], async (req,res) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if (!user){
      return res.status(400).json({"error":"Please login with correct credentials"});
    }

    const success = true;
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare){
      success = false;
      return res.status(400).json({"error":"Please login with correct credentails"});
    }

    const payload = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(payload, secret_key);
    res.json({success,authToken});
  }
  catch(error){
    return res.status(500).send("Intenal server error occured");
  }
})

// Route3: getting user details: login require
router.post('/getUser', fetchUser, async (req,res) => {
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  }
  catch(error){
    return res.status(500).send("Some internal error occured");
  }
})

module.exports = router;