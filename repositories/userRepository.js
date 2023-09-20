const mysql = require("mysql2");
const User = require("../models/user");

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
});

// Establece la conexión a la base de datos
db.connect();

class UserRepository {

  static comprarProducto(user_id, product_id, cantidad, callback) {
    // Consulta SQL para registrar una compra en la tabla 'compras'
    const query =
      "INSERT INTO compra (user_id, product_id, cantidad) VALUES (?, ?, ?)";
    db.query(query, [user_id, product_id, cantidad], (err, result) => {
      if (err) {
        // Maneja errores al registrar la compra
        console.error("Error al registrar la compra: " + err.message);
        callback(false);
      } else {
        // Registro de éxito al registrar la compra
        console.log("Compra realizada con éxito");
        callback(true);
      }
    });
  }

  // Método para agregar un nuevo usuario a la base de datos
  static addUser(id_user, email, name_user, lastName, password, rol, callback) {
    // Validación de los datos de entrada
    if (!id_user || !email || !name_user || !lastName || !password || !rol) {
      console.error("Faltan datos obligatorios para registrar el usuario");
      callback(false);
      return;
    }

    // Consulta SQL para insertar un nuevo usuario en la tabla 'usuarios'
    const query =
      "INSERT INTO usuario (id_user, email, name_user, lastName, password, rol) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [id_user, email, name_user, lastName, password, rol], (err, result) => {
      if (err) {
        // Maneja errores al registrar el usuario
        console.error("Error al registrar el usuario: " + err.message);
        callback(false);
      } else {
        // Registro de éxito al registrar el usuario
        console.log("Usuario registrado con éxito");
        callback(true);
      }
    });
  }

  static obtenerInformacionUsuario(user_id, callback) {
    const query = 'SELECT * FROM usuario WHERE id_user = ?';
    db.query(query, [user_id], (err, result) => {
      if (err) {
        console.error('Error al obtener la información del usuario: ' + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const usuario = result[0];
        callback(null, usuario);
      }
    });
  }
}

module.exports = UserRepository;
