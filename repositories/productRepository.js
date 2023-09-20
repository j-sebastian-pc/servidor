const mysql = require("mysql2");
const Product = require("../models/Product");


//Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
});

connection.connect();

class ProductRepository {
  //Método privado para mapear una fila de resultados a un objeto Product
  static mapRowToProduct(row) {
    return new Product(row.id_pro, row.name_pro, row.descripcion, row.precio);
  }

  // Método para obtener todos los productos
  static getAllProducts(callback) {
    //Realiza una consulta SQL para seleccionar todos los productos en la tabla 'products'
    connection.query("SELECT * FROM producto", (error, results) => {
      if (error) throw error;

      //Mapea los resultados de la consulta a objetos de la clase Product
      const products = results.map((row) => new Product (row.id_pro, row.name_pro, row.precio));
      //Llama a la función de devolución llamada (callback) con la lista de productos
      callback(products);
    });
  }

  //Método para obtener un producto por su ID
  static getProductById(id, callback) {
    //Realiza una consulta SQL para seleccionar un producto con el ID proporcionado
    connection.query(
      "SELECT * FROM producto WHERE id_pro = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          //Si se encontró un producto, crea un objeto Product con los datos y llama a la función de devolución de llamada
          const productData = results[0];
          const product = ProductRepository.mapRowToProduct(productData);
          callback(product);
        } else {
          //Si no se encontró un producto con el ID proporcionado, llama a la función de devolución de llamada con null
          callback(null);
        }
      }
    );
  }

  //Método para agregar un nuevo producto a la base de datos
  static addProduct(product, callback) {
    //Realiza una consulta SQL para insertar un nuevo producto en la tabla 'productos'
    connection.query(
      "INSERT INTO producto (id_pro, name_pro, precio) VALUES (?, ?, ?)",
      [product.id_pro, product.name_pro, product.precio],
      (error, results) => {
        if (error) throw error;

        //Obtiene el ID del nuevo producto insertado y llama a la función de devolución de llamada con ese ID
        const newProductId = results.insertId;
        callback(newProductId);
      }
    );
  }

  //Método para actualizar un producto en la base de datos
  static updateProduct(product, callback) {
    // Realiza una consulta SQL para actualizar el nombre y precio de un producto con el ID proporcionado
    connection.query(
      "UPDATE producto SET name_pro = ?, precio = ? WHERE id_pro = ?",
      [product.name_pro, product.precio, product.id_pro],
      (error) => {
        if (error) throw error;

        //Llama a la función de devolución de llamada cuando la actualización se completa con éxito
        callback();
      }
    );
  }

  //Método para eliminar un producto de la base de datos
  static deleteProduct(id_pro, callback) {
    //Realiza una consulta SQL para eliminar un producto con el ID proporcionado
    connection.query("DELETE FROM producto WHERE id_pro = ?", [id_pro], (error) => {
      if (error) throw error;

      //Llama a la función de devolución de llamada cuando la eliminación se completa con éxito
      callback();
    });
  }
}

module.exports = ProductRepository;

