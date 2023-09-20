const express = require('express');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin');
const productController = require('../controllers/product-controller');

// Ruta para eliminar un producto. Requiere autenticación JWT de administrador.
router.delete('/', ValidateAdmin.njwtAuth, productController.deleteAProduct);

// Middleware ValidateAdmin.njwtAuth:
// Este middleware verifica que el usuario que intenta eliminar el producto sea un administrador.

// Controlador productController.deleteAProduct:
// Este controlador maneja la lógica de eliminación del producto.

module.exports = router;
