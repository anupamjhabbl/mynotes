const express = require('express');
const {body, validationResult} = require('express-validator');
const Notes = require('../models/Notes')
const router = express.Router();

router.post('/',[
    body('title',"Title must be smaller than 50 letters").isLength({max:50}),
    body('description',"Description must be greater than 100 letters").isLength({min:100})
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

      Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag:req.body.tag
    }).then(notes => res.json(notes)).catch(err => {
        res.json({"error":"Please give unique title","message":err});
    });
});

module.exports = router;