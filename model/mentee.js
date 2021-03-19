const mongoose = require('mongoose');
    
const Mentee = mongoose.model('mentee', new mongoose.Schema({
                    name: {
                        type: String,
                        required:true
                    //enum:['AAmir','Shahrukh','Salman']
                    //match: /.*an.*/i
                    },
                    joiningDate: {
                        type: Date,
                        default: Date.now
                    },
                    percentile: Number
                }));

module.exports = Mentee;