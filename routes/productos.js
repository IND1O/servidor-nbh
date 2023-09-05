const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/productos
router.post(
  "/",
  [
    check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción del producto es obligatoria")
      .not()
      .isEmpty(),
    check("imagen", "La imagen del producto es obligatoria").not().isEmpty(),
  ],
  auth,
  productoController.crearProducto
);

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/", auth, productoController.obtenerProductos);

///////////////////////////////////////////////////////////////////////////////////////////

router.put(
  "/:id",
  [
    check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción del producto es obligatoria")
      .not()
      .isEmpty(),
    check("imagen", "La imagen del producto es obligatoria").not().isEmpty(),
  ],
  auth,
  productoController.actualizarProducto
);

///////////////////////////////////////////////////////////////////////////////////////////

router.delete("/:id", auth, productoController.eliminarProducto);

module.exports = router;
