const express = require('express');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin');
const productController = require('../controllers/product-controller');

// Ruta para agregar un producto. Requiere autenticación JWT de administrador.
router.post('/', ValidateAdmin.njwtAuth, productController.addProduct);

module.exports = router;
