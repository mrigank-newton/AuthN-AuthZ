const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Course, validateCourse} = require('./../model/course');
const mentor = require('../middleware/mentor');
const {Session, validateSession} = require('../model/session');

const router = express.Router();

router.post('/', [auth, admin], (req, res) => {
    const requestBody = req.body;

    const {error} = validateUser(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    const course = new Course(requestBody)
    try {
        const savedCourse = await course.save();
        res.send(savedCourse); 
    }  catch(ex) {
        return res.status(400).send(ex.message);
    }
});

router.get('/', (req, res) => {
    return res.send(await Course.find());
});

router.get('/:id', [auth], (req, res) => {
    let course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404).send(`Course with id ${req.params.id} not found`);
        return;
    }

    res.send(course);
});

router.put('/:id', [auth, admin], (req, res) => {
    let course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404).send(`Course with id ${req.params.id} not found`);
        return;
    }

    const requestBody = req.body;
    const {error} = validateCourse(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, requestBody);
        res.send(updatedCourse); 
    }  catch(ex) {
        return res.status(400).send(ex.message);
    }
});

router.get('/mentors/:mentorId', [auth, mentor], (req, res) => {
    
    let mentor = await Mentor.findOne({mentorId: req.params.id});

    if(!mentor) {
        res.status(404).send(`Mentor with id ${req.params.id} not found`);
        return;
    }

    const courses = await Course.find({mentorId: req.params.mentorId});
    res.send(courses);
});

router.put('/:courseId/mentees/:menteeId/subscribe', [auth], (req, res) => {
    
    let course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404).send(`Course with id ${req.params.id} not found`);
        return;
    }

    course.menteesId =  [...course.menteesId, req.params.menteeId];
    const subscribedCourse = await course.save();

    delete subscribedCourse.menteesId;
    delete subscribedCourse.mentorId;

    res.send(subscribedCourse);
});

router.post('/:courseId/sessions', [auth, mentor], (req, res) => {

    const {courseId} = req.params;

    let course = await Course.findById(courseId);

    if(!course) {
        res.status(404).send(`Course with id ${courseId} not found`);
        return;
    }

    const session  =new Session(req.body);
    try {
        const savedSession = await session.save();
        res.send(savedSession);
    } catch(ex) {
        res.status(400).send(ex.message);
    }
});




module.exports = router;