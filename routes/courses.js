const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Course, validateCourse} = require('./../model/course');
const mentor = require('../middleware/mentor');
const {Session, validateSession} = require('../model/session');

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
    const requestBody = req.body;

    const {error} = validateCourse(req.body);
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

router.get('/', async (req, res) => {
    const courses = await Course.find()
                                .populate('mentorId', 'name email persona contactNumber')
                                .populate('menteesId', 'name email persona contactNumber');
    res.send(courses);
});

router.get('/:id', [auth], async (req, res) => {
    let course = await Course.findById(req.params.id);

    if(!course) {
        res.status(404).send(`Course with id ${req.params.id} not found`);
        return;
    }

    res.send(course);
});

router.put('/:id', [auth, admin], async (req, res) => {
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

router.get('/mentors/:mentorId', [auth, mentor], async (req, res) => {
    
    let mentor = await Mentor.findOne({mentorId: req.params.id});

    if(!mentor) {
        res.status(404).send(`Mentor with id ${req.params.id} not found`);
        return;
    }

    const courses = await Course.find({mentorId: req.params.mentorId});
    res.send(courses);
});

router.get('/mentees/:menteeId', [auth], async (req, res) => {
    
    let mentee = await Mentee.findOne({mentee: req.params.id});

    if(!mentee) {
        res.status(404).send(`Mentee with id ${req.params.id} not found`);
        return;
    }

    const courses = await Course.find({menteesId: req.params.menteeId});
    res.send(courses);
});

router.put('/:courseId/mentees/:menteeId/subscribe', [auth], async (req, res) => {
    
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

router.post('/:courseId/sessions', [auth, mentor], async (req, res) => {

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

router.get('/:courseId/sessions/:date', [auth, mentor], async (req, res) => {

    const {persona = 'mentee'} = req.query;
    const {courseId, date} = req.params;

    let course = await Course.findById(courseId);

    if(!course) {
        res.status(404).send(`Course with id ${courseId} not found`);
        return;
    }

    const session = await Session.findOne({date});

    if(!session) {
        res.status(404).send(`Session details for date ${new Date(date)} not found`);
        return;
    }

    if(persona === 'mentee') {
        delete session.rating;
    }

    res.send(session);
});

router.get('/topics/all', async (req, res) => {
    console.log('Here');

    try {
        const topics = await Course.find().select('topic').distinct('topic');
        res.send(topics);
    } catch(ex) {
        console.log(ex.message);
    }
    
});





module.exports = router;