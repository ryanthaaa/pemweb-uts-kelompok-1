const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rental.controller');

// READ 
router.get('/rentals', rentalController.getAllRentals);

// CREATE 
router.get('/rentals/tambah', rentalController.getCreateForm);
router.post('/rentals/create', rentalController.createRental);

// UPDATE 
router.get('/rentals/edit/:id', rentalController.getEditForm);
router.post('/rentals/edit/:id', rentalController.updateRental);

// DELETE 
router.post('/rentals/delete/:id', rentalController.deleteRental);

module.exports = router;