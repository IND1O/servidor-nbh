const express = require("express");
const { check } = require("express-validator");
const usuarioControllers = require("../controllers/usuarioController");

const router = express.Router();

//api/usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioControllers.crearUsuario
);

module.exports = router;
