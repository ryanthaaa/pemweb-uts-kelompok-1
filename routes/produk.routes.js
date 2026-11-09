const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produk.controller');

// READ 
router.get('/products', produkController.getAllProducts);

// CREATE 
router.get('/products/tambah', produkController.getCreateForm);
router.post('/products/create', produkController.createProduct);

// UPDATE 
router.get('/products/edit/:id', produkController.getEditForm);
router.post('/products/edit/:id', produkController.updateProduct);

// DELETE 
router.post('/products/delete/:id', produkController.deleteProduct);

module.exports = router;