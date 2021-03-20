const mongoose = require('mongoose');
    
const Session = mongoose.model('session', new mongoose.Schema({
                    courseId: mongoose.Schema.Types.ObjectId,
                    date: {
                        type: Date,
                        default: Date.now
                    },
                    lectureLink: String,
                    notesLink: String,
                    rating: Number,
                    startTime: Date,
                    endTime: Date
}));

const validateSession = (session) => {
    const sessionSchema = Joi.object({
        courseId: Joi.string().min(5).max(50).required(),
        date: Joi.date().required(),
        rating: Joi.number().min(1).max(5).required(),
        lectureLink: Joi.string().min(5).max(1024).required(),
        notesLink: Joi.string().min(5).max(1024).required(),
    })

    const validationResult = sessionSchema.validate(session); 
    return validationResult;
}

module.exports = {Session, validateSession};