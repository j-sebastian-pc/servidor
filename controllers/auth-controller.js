const bcrypt = require('bcryptjs');
const signingKey = require('../config/keys');
const generateToken = require('../helpers/generator-token');

// Función para autenticación
const auth = (req, res) => {
  const { email, password, rol } = req.body;

  // Cambia la lógica de autenticación aquí según tus necesidades
  // Por ejemplo, puedes verificar el correo electrónico y la contraseña en una base de datos
  // Simularemos una autenticación exitosa si el email y la contraseña no están vacíos
  if (email && password && rol) {
    // Genera un token JWT con información de correo electrónico y rol, con una fecha de vencimiento
    const token = generateToken(
      { email, rol },
      signingKey.SIGNING_KEY_TOKEN,
      new Date().getTime() + 100 * 60 * 1000 // El token expirará en 100 minutos
    );

    // Configuración de la cookie para el token de actualización
    const cookieConfig = {
      domain: 'localhost',
      path: '/refresh',
      secure: false,
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
      signed: true,
    };

    return res.status(200)
      .cookie('refresh_token', email, cookieConfig)
      .json({ status: 'Autenticación exitosa', token });
  } else {
    return res.status(401).json({ status: 'Autenticación fallida' });
  }
};

module.exports = {
  auth
};
