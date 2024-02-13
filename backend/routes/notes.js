const express = require("express");
const router = express.Router();
const fetchuser=require('../middleware/fetchuser')
const Note=require('../modals/Note')
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // console.log('User ID:', req.user.id); // Add this line for debugging
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});


router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id, // Assign the user ID from the authentication token
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});


router.put("/update/:id", fetchuser, async(req, res)=>{
    const {title, description, tag}=req.body
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    let note=await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }
    note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note})
})

router.delete("/delete/:id", fetchuser, async(req, res)=>{
    const {title, description, tag}=req.body

    let note=await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({Success:"Successfully deleted"})
})

module.exports=router