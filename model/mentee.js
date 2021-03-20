const mongoose = require('mongoose');
    
const Mentee = mongoose.model('mentee', new mongoose.Schema({
                    menteeId: mongoose.Schema.Types.ObjectId,
                    joiningDate: {
                        type: Date,
                        default: Date.now
                    },
                    percentile: Number,
                }));

module.exports = Mentee;