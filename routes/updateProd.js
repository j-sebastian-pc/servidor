const express = require('express');
const productController = require('../controllers/product-controller');
const ValidateAdmin = require('../middleware/ValidateAdmin');
const router = express.Router();

// Ruta para actualizar un producto.
router.put('/', ValidateAdmin.njwtAuth, productController.updateAProduct);

// Descripción de la ruta:
// Esta ruta se utiliza para actualizar un producto existente.
// Cuando se recibe una solicitud POST en esta ruta, se pasa la solicitud al controlador
// productController.updateAProduct, que se encarga de procesar la actualización del producto.

module.exports = router;
