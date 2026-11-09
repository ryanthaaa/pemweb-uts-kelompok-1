const express = require('express');
const router = express.Router();

const computerController = require('../controllers/computer.controller');

// READ 
router.get('/computers', computerController.getAllComputers);

// CREATE 
router.get('/computers/tambah', computerController.getCreateForm);
router.post('/computers/create', computerController.createComputer);

// UPDATE 
router.get('/computers/edit/:id', computerController.getEditForm);
router.post('/computers/edit/:id', computerController.updateComputer);

// DELETE 
router.post('/delete/:id', computerController.deleteComputer);

module.exports = router;