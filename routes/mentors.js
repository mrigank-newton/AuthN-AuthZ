const express = require('express');
const Mentor = require('./../model/mentor');
const router = express.Router();
const auth = require('./../middleware/auth');
const admin = require('./../middleware/admin');

router.get('/', async (req,res) => {
    const mentors = await Mentor.find().populate('mentorId', 'name email contactNumber');
    res.send(mentors);
});

router.get('/:mentorId', async (req,res) => {
    const mentor = await Mentor.findOne({mentorId: req.params.mentorId});

    if(!mentor) {
        res.status(404).send(`Mentor with id ${req.params.mentorId} not found`);
        return;
    }

    res.send(mentor);
});

router.post('/', [auth, admin], async (req, res) => {
    
        const requestBody = req.body;
        const mentor = new Mentor(requestBody)
        try {
            const savedMentor = await mentor.save();
            res.send(savedMentor); 
        }  catch(ex) {
            return res.status(400).send(ex.message);
        } 
});

//fn().then

router.put('/:mentorId', [auth, admin], async (req, res) => {

    try {
        let mentor = await Mentor.findById(req.params.mentorId);

        if(!mentor) {
            res.status(404).send(`Mentor with id ${req.params.mentorId} not found`);
            return;
        }

        const requestBody = req.body;

        if(!requestBody.topics || requestBody.topics.length === 0) {
            return res.status(400).send('Mentor should have atleast one topic');
        }   

        const newMentor = new Mentor({
            ...mentor,
            ...requestBody
        })

        res.send(await newMentor.save());

    } catch(ex) {
        return res.send(ex.message);
    }
});

router.delete('/:mentorId', [auth, admin], async (req, res) => {
    //if id does not exist, 404
    //delete the mentor
    try {
        const mentor = await Mentor.findByIdAndDelete(req.params.mentorId);
        if(!mentor) {
            res.status(404).send(`Mentor with id ${req.params.mentorId} not found`);
            return;
        }

        res.send(mentor);   
    } catch(ex) {
        return res.send(ex.message);
    }
});

module.exports = router;