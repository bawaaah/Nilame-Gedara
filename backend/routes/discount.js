const express = require('express');
const Discount = require('../models/Discount'); // Path to your discount schema
const router = express.Router();

router.post('/validate-discount', async (req, res) => {
  const { code } = req.body;

  try {
    const discount = await Discount.findOne({ discountcode: code });

    if (!discount) {
      return res.status(400).json({ error: 'Invalid discount code' });
    }

    // Return the discount percentage to the frontend
    res.json({ discountpercentage: discount.discountpercentage });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
    const { discountcode, discountpercentage, employeeid, points } = req.body;
  
    try {
      const newDiscount = new Discount({ discountcode, discountpercentage, employeeid, points });
      const savedDiscount = await newDiscount.save();
      res.status(201).json(savedDiscount);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const discounts = await Discount.find();
      res.status(200).json(discounts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
  // Get a specific discount by ID
router.get('/:id', async (req, res) => {
    try {
      const discount = await Discount.findById(req.params.id);
      if (!discount) {
        return res.status(404).json({ error: 'Discount not found' });
      }
      res.status(200).json(discount);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
      // Fields to update from the request body
      const updateData = {
        discountcode: req.body.discountcode,
        discountpercentage: req.body.discountpercentage,
        employeeid: req.body.employeeid,
        points: req.body.points,
      };
  
      // Find and update the discount, returning the updated document
      const updatedDiscount = await Discount.findByIdAndUpdate(
        req.params.id, // The ID of the document to update
        updateData, // The data to update with
        { new: true, runValidators: true } // Return the updated document, validate the schema
      );
  
      if (!updatedDiscount) {
        // If no document was found, return a 404 error
        return res.status(404).json({ error: 'Discount not found' });
      }
  
      // Successful update
      res.status(200).json(updatedDiscount);
  
    } catch (error) {
      // Handle errors (e.g., invalid ID format or validation issues)
      res.status(400).json({ error: error.message });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
  
      if (!deletedDiscount) {
        return res.status(404).json({ error: 'Discount not found' });
      }
  
      res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
