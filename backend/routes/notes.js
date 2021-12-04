const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes'); 
const { body, validationResult } = require('express-validator');

//ROUTE 1: Fetch all notes of User using: GET request "/api/notes/fetch-all-notes". Loggin Required
router.get('/fetch-all-notes', fetchUser, async (req, res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry, Something want wrong")
    }
})

//ROUTE 2: Add a new Note using: POST request "/api/notes/add-note". Loggin Required
router.post('/add-note', fetchUser, [
    body('title', 'Title schould be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'Description schould be minimum of 3 characters').isLength({min: 3})
],async (req, res) =>{
    //If there are errors then return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const note = await Notes.create({
            user: userId,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        });
        res.status(200).send({message:"Note Added Successfully", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry, Something want wrong")
    }
})

//ROUTE 3: Update Note using: PUT request "/api/notes/update-note/:id". Loggin Required
router.put('/update-note/:id', fetchUser, [
    body('title', 'Title schould be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'Description schould be minimum of 3 characters').isLength({min: 3})
], async (req, res)=>{
    //If there are errors then return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title, description, tag} = req.body;
        const updateNote = {};
        if(title){updateNote.title = title};
        if(description){updateNote.description = description};
        if(tag){updateNote.tag = tag};

        //Check Note is exists or not
        let notes = await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send("This Note Not Found");
        }
        //Check Note is loggin user note or not
        if(notes.user.toString() !== req.user.id){
            return res.status(400).send("You don't have access to update this note");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, {$set: updateNote}, {new:true});
        res.status(200).send({message:"Note Updated Successfully", notes: notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry, Something want wrong")
    }   
})

//ROUTE 4: Delete Note using: DELETE request "/api/notes/delete-note/:id". Loggin Required
router.delete('/delete-note/:id', fetchUser, async (req, res)=>{
    try {
        //Check Note is exists or not
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Not Found");
        }
        //Check Note is loggin user note or not
        if(note.user.toString() !== req.user.id){
            return res.status(402).send("You don't have access to delete this note");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).send({message:"Note Deleted Successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry, Something want wrong")
    }
})

module.exports = router