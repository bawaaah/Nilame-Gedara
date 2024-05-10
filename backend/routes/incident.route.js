const express = require('express');
const router = express.Router();
const Incident = require('../models/incident.model');

// Create a new incident
router.post('/', async (req, res) => {
  try {
    const { category, description, location, severity, status } = req.body;
    const newIncident = new Incident({ category, description, location, severity, status });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific incident
router.get('/:id', getIncident, (req, res) => {
  res.json(res.incident);
});

// Update a specific incident
router.put('/:id', getIncident, async (req, res) => {
  try {
    const { category, description, location, severity, status, inventoryCount } = req.body;
    res.incident.category = category;
    res.incident.description = description;
    res.incident.location = location;
    res.incident.severity = severity;
    res.incident.status = status;

    // Update inventory count 
    if (inventoryCount !== undefined) {
      const oldCount = res.incident.inventoryCount || 0;
      const newCount = parseInt(inventoryCount);
      const diff = newCount - oldCount;
      if (diff !== 0) {
        res.incident.inventoryCount = newCount;
        
      }
    }

    await res.incident.save();
    res.json(res.incident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific incident
router.delete('/:id', getIncident, async (req, res) => {
  try {
    await Incident.deleteOne({ _id: req.params.id });
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});  

async function getIncident(req, res, next) {
try {
  const incident = await Incident.findById(req.params.id);
  if (incident == null) {
    return res.status(404).json({ message: 'Incident not found' });
  }
  res.incident = incident;
  next();
} catch (err) {
  return res.status(500).json({ message: err.message });
}
}

module.exports = router;