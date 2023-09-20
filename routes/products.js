const express = require('express');
const productController = require('../controllers/product-controller');
const ValidateAdmin = require('../middleware/ValidateAdmin');
const router = express.Router();

// Ruta para obtener la lista de productos.
router.get('/', ValidateAdmin.njwtAuth, productController.getProducts);

// Controlador productController.getProducts:
// Este controlador maneja la lógica de obtener la lista de productos.
// Cuando se recibe una solicitud GET en esta ruta, se pasa la solicitud a este controlador,
// que se encarga de recuperar la lista de productos y enviarla al cliente que hizo la solicitud.

module.exports = router;
