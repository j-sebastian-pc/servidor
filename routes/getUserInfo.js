const express = require('express');
const registerController = require('../controllers/register-controller');
const ValidateAdmin = require ('../middleware/ValidateAdmin')
const router = express.Router();

router.get('/', ValidateAdmin.njwtAuth, registerController.verPerfilUsuario);

module.exports = router;
