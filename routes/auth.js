const express = require('express');
const Joi = require('joi');
const {User} = require('./../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {

    const {error} = validateAuthBody(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(400).send('Email or password does not exist');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.status(400).send('Email or password does not exist');
    }

    const token = jwt.sign({_id: user._id, name: user.name}, '1@3456Qw-');
    res.header('x-auth-header', token).send({
        email: user.email,
        isAuthenticated: true
    });
});

const validateAuthBody = (body) => {
    const userSchema = Joi.object({
        password: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
    })

    const validationResult = userSchema.validate(body); 
    return validationResult;
}

module.exports = router;
