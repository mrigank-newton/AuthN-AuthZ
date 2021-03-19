const express = require('express');
const Mentor = require('./../model/mentor');
const router = express.Router();
const auth = require('./../middleware/auth');

router.get('/', async (req,res) => {
    const mentors = await Mentor.find();
    res.send(mentors);
});

router.get('/:id', async (req, res) => {

    try {
        const mentor = await Mentor.findById(req.params.id);
        if(!mentor) {
            res.status(404).send(`Mentor with id ${req.params.id} not found`);
            return;
        }

        res.send(mentor);
    } catch(ex) {
        res.status(400).send('Id is invalid');
    }
});

router.post('/', auth, async (req, res) => {
    
        const requestBody = req.body;

        // if(!requestBody.topics || requestBody.topics.length === 0) {
        // return res.status(400).send('Mentor should have atleast one topic');
        // }

        const mentor = new Mentor(requestBody)
        try {
            await mentor.validate()
        }  catch(ex) {
            return res.status(400).send(ex.message);
        }
        const savedMentor = await mentor.save();
        res.send(savedMentor); 
});

//fn().then

router.put('/:id', auth, async (req, res) => {
    //if id does not exist, 404
    //if topics is empty, 400
    //Update the mentor

    try {
        let mentor = await Mentor.findById(req.params.id);

        if(!mentor) {
            res.status(404).send(`Mentor with id ${req.params.id} not found`);
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

router.delete('/:id',async (req, res) => {
    //if id does not exist, 404
    //delete the mentor
    try {
        const mentor = await Mentor.findByIdAndDelete(req.params.id);
        if(!mentor) {
            res.status(404).send(`Mentor with id ${req.params.id} not found`);
            return;
        }

        res.send(mentor);   
    } catch(ex) {
        return res.send(ex.message);
    }
});

module.exports = router;