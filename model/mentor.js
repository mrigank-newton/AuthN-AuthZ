const mongoose = require('mongoose');
    
const Mentor = mongoose.model('mentor', new mongoose.Schema({
                    name: {
                        type: String,
                        required:true,
                        minLength: 5,
                        maxLength: 50
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
                    }
                }));

module.exports = Mentor;