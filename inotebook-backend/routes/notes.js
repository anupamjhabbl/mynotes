const express = require('express');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

// Route1 saveNote : authentication required
router.post('/addNote', fetchUser, [
  body('title', "Title must be greater than 3 letters").isLength({ min: 3 }),
  body('description', "Description must be greater than 5 letters").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const note = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      userId: req.user.id
    });
    res.json({ "note": note, "message": "note successfully added" });
  }
  catch (error) {
    res.status(500).send("Some internal server error ocuured");
  }

});

// Router2 fetching all the notes: login required
router.get('/fetchNotes', fetchUser, async (req, res) => {
  try{
    const notes = await Notes.find({ userId: req.user.id });
    res.json({ "notes": notes });
  }
  catch(error){
    res.status(500).send("Some Internal server error occured")
  }
})



module.exports = router;