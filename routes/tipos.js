const express = require("express");
const router = express.Router();
const tipoController = require("../controllers/tipoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/tipos
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre del tipo es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("producto", "El producto es obligatorio").not().isEmpty(),
  ],
  tipoController.crearTipo
);

router.get("/", auth, tipoController.obtenerTipos);

router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre del tipo es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("producto", "El producto es obligatorio").not().isEmpty(),
  ],
  tipoController.actualizarTipo
);

router.delete("/:id", auth, tipoController.eliminarTipo);

module.exports = router;
