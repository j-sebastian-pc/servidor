const mysql = require("mysql2");
const Compra = require("../models/compra");


//Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
});

connection.connect();

class saleRepository {
  static saleProduct(product, callback) {
    connection.query(
      "INSERT INTO compra (user_id, product_id, cantidad) VALUES (?, ?, ?)",
      [product.user_id, product.product_id, product.cantidad],
      (error, results) => {
        if (error) throw error;
        const newCompra = results.insertId;
        callback(newCompra);
      }
    );
  }
}

module.exports = saleRepository;

