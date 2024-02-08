const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the MedicalRecord schema
const MedicalRecordSchema = new Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    imageUrl: {
        type: [String]
    }
});

// Create the MedicalRecord model
const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);

module.exports = MedicalRecord;
