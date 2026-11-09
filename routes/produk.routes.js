const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produk.controller');

// READ 
router.get('/', produkController.getAllProducts);

// CREATE 
router.get('/tambah', produkController.getCreateForm);
router.post('/create', produkController.createProduct);

// UPDATE 
router.get('/edit/:id', produkController.getEditForm);
router.post('/edit/:id', produkController.updateProduct);

// DELETE 
router.post('/delete/:id', produkController.deleteProduct);

module.exports = router;