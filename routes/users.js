const express = require('express');
const {User, validateUser, validatePassword} = require('./../model/user');
const generateHash = require('./../hash');
const router = express.Router();
const auth =  require('./../middleware/auth');
const _ = require('lodash');

router.post('/', async (req,res) => {

    const {error} = validateUser(req.body);
    const {error: passwordError} = validatePassword(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }
    if(passwordError) {
        return res.status(400).send(`${passwordError}`);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('User already exists');
    }

    try {
        const user = new User({...req.body, password: await generateHash(req.body.password)});
        const response = await user.save();
        res.send(_.pick(response, ['name', 'email', '_id']));
    } catch(ex) {
        res.status(400).send(ex.message);
    }
});

router.get('/:id', [auth], async (req,res) => {

    let user = await User.findById(req.params.id);

    if(user) {
        return res.status(400).send('User already exists');
    }

    res.send(_.pick(user, ['name', 'email', 'persona']));
});

module.exports = router;
