const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['reported', 'in_progress', 'resolved'],
    default: 'reported',
  },
  inventoryCount: {
    type: Number,
    default: 100,
  },
  penalties: {
    type: Number,
    default: 0,
  },
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;