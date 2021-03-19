const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const User = mongoose.model('user', new mongoose.Schema({
                    name: {
                        type: String,
                        required:true,
                        minLength: 5,
                        maxLength: 50,
                    },
                    email: {
                        type: String,
                        required: true,
                        unique: true,
                        minLength: 5,
                        maxLengh: 255
                    },
                    password: {
                        type: String,
                        required: true,
                        minLength: 5,
                        maxLength: 1024
                    },
                    isAdmin: {
                        type: Boolean, 
                        default: false
                    }
                }));

const validateUser = (user) => {
    const userSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
    })

    const validationResult = userSchema.validate(user); 
    return validationResult;
} 

const validatePassword = ({name, password}) => {

    if(password.toLowerCase().includes(name.toLowerCase())) {
        return {error: 'Password cannot contain username'};
    }
    return passwordComplexity().validate(password);
} 


module.exports = {User, validateUser, validatePassword};