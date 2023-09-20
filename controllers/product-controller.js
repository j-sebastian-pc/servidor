const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");
const ValidateAdmin = require('../middleware/ValidateAdmin');
const Product = require("../models/Product");
const Compra = require("../models/compra");
const saleRepository = require("../repositories/saleRepository");

// Middleware para verificar el administrador
const checkAdmin = (req, res, next) => {
  ValidateAdmin.njwtAuth(req, res, next);
};

// Función para manejar errores
const handleResponse = (res, message) => {
  return (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message });
    }
  };
};

// Obtiene todos los productos y los devuelve como respuesta en formato JSON
const getProducts = (req, res) => {
  ProductRepository.getAllProducts((Product) => {
    res.status(200).json(Product);
  });
};


const addProduct = (req, res) => {
  const newProduct = new Product(req.body.id_pro, req.body.name_pro, req.body.precio)
  ProductRepository.addProduct(newProduct, () => {
    res.status(200).json({
      message: "Producto registrado correctamente"
    })
  })
}

const updateAProduct = (req, res) => {
  const productUpdate = new Product(req.body.id_pro, req.body.name_pro, req.body.precio)
  ProductRepository.updateProduct(productUpdate, () => {
    res.status(200).json({
      message: "Producto actualizado correctamente"
    })
  })
}

const deleteAProduct = (req, res) => {
  ProductRepository.deleteProduct(req.query.id, () => {
    res.status(200).json({
      message: "Producto eliminado correctamente"
    })
  })
}

const comprarProducto = (req, res) => {
  const saleProduct = new Compra(req.body.user_id, req.body.product_id, req.body.cantidad)
  saleRepository.saleProduct(saleProduct, () => {
    res.status(200).json({
      message: "Producto Comprado correctamente"
    })
  })
}

// const addProduct1 = (req, res) => {
//   ProductRepository.addProduct(req.body, handleResponse(res, "Producto registrado correctamente"));
// };

// const updateAProduct1 = (req, res) => {
//   ProductRepository.updateProduct(req.body, handleResponse(res, "Producto actualizado correctamente"));
// };

// const deleteAProduct1 = (req, res) => {
//   ProductRepository.deleteProduct(req.query.id_pro, handleResponse(res, "Producto eliminado correctamente"));
// };

// const comprarProducto1 = (req, res) => {
//   const user_id = req.body.user_id;
//   const product_id = req.body.product_id;
//   const cantidad = req.body.cantidad;

//   UserRepository.comprarProducto(user_id, product_id, cantidad, (success) => {
//     if (success) {
//       res.status(200).json({ message: "Compra realizada con éxito" });
//     } else {
//       res.status(500).json({ message: "No se pudo completar la compra" });
//     }
//   });
// };

module.exports = {
  getProducts,
  addProduct,
  updateAProduct,
  deleteAProduct,
  comprarProducto,
  checkAdmin, // Exporta el middleware de verificación de administrador si es necesario en otros lugares.
};
