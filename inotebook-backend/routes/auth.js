const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

    const secret_key = "Anupam loves mustang, supra, GTR, camaro";
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

module.exports = router;