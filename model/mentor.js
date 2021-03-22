const mongoose = require('mongoose');
    
const Mentor = mongoose.model('mentor', new mongoose.Schema({
                    mentorId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    topics: {
                        type:  [ String ],
                        validate: {
                            validator: function(t) {
                                //this
                                return t && t.length > 0;
                            },
                            message: 'Atleast one topic is required'
                        },
                       
                    },
                    tags: [String],
                    joiningDate: {
                        type: Date,
                        default: Date.now
                    },
                    workExperience: [Number]
                }));

module.exports = Mentor;