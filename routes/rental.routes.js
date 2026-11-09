const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rental.controller');

// READ 
router.get('/', rentalController.getAllRentals);

// CREATE 
router.get('/tambah', rentalController.getCreateForm);
router.post('/create', rentalController.createRental);

// UPDATE 
router.get('/edit/:id', rentalController.getEditForm);
router.post('/edit/:id', rentalController.updateRental);

// DELETE 
router.post('/delete/:id', rentalController.deleteRental);

module.exports = router;