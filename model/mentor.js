const mongoose = require('mongoose');
    
const Mentor = mongoose.model('mentor', new mongoose.Schema({
                    name: {
                        type: String,
                        required:true,
                        minLength: 5,
                        maxLength: 50,
                        get: p => p.toUpperCase().trim(),
                        set: p => p.toUpperCase().trim()
                    //enum:['AAmir','Shahrukh','Salman']
                    //match: /.*an.*/i
                    },
                    isFull: {
                        type: Boolean,
                        default: false
                    },
                    fees: {
                        type: Number,
                        required: function() {
                            return !this.isFull;
                        },
                        min: 20,
                        max: 50
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
                    numberOfMentees: Number,
                    rating: {
                        type: Number,
                        get: r => Math.round(r)
                    }
                }, {
                    toObject : {getters: true, setters: true},
                    toJSON : {getters: true, setters: true}
                }));

module.exports = Mentor;