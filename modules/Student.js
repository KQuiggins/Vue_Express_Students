const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CIT321');

const studentSchema = new mongoose.Schema({
    sid: {type: Number, required: true, unique: true},
    last_name: {type: String, required: true},
    first_name: {type: String, required: true},
    major: {type: String, required: true},
    hrs_attempted: {type: Number, required: true},
    gpa_points: {type: Number, required: true}
});

module.exports = mongoose.model('Student', studentSchema);