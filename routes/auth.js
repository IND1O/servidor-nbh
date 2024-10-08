const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

//api/auth

// Iniciar Sesion
router.post(
  "/",
  // [
  //   check("email", "Agrega un email válido").isEmail(),
  //   check("password", "El password debe ser minimo de 6 caracteres").isLength({
  //     min: 6,
  //   }),
  // ],
  authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
