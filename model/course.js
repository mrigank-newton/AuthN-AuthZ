const mongoose = require('mongoose');
const Joi = require('joi');
    
const Course = mongoose.model('course', new mongoose.Schema({
                    name: String,
                    topic: String,
                    fees: Number,
                    startDate: Date,
                    endDate: Date,
                    mentorId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    menteesId:  [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    }],
                    rating: Number
                }));

const validateCourse = (user) => {
    const courseSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        topic: Joi.string().min(5).max(50).required(),
        fees: Joi.number().min(20).max(50).required(),
        startDate: Joi.date().greater('1-1-1974'),
        endDate: Joi.date().greater('now'),
        mentorId: Joi.string().min(5).max(50).required(),
        rating: Joi.number().min(1).max(5).required(),
        menteesId: Joi.array().required()
    })

    const validationResult = courseSchema.validate(user); 
    return validationResult;
}

module.exports = {Course, validateCourse};