const Tipo = require("../models/Tipos");
const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearTipo = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { producto } = req.body;

    const existeProducto = await Producto.findById(producto);

    if (!existeProducto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (existeProducto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tipo = new Tipo(req.body);

    await tipo.save();

    res.json({ tipo });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};

exports.obtenerTipos = async (req, res) => {
  try {
    const { producto } = req.body;

    const existeProducto = await Producto.findById(producto);

    if (!existeProducto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (existeProducto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tipos = await Tipo.find({ producto });
    res.json({ tipos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};

exports.actualizarTipo = async (req, res) => {
  try {
    const { producto, nombre, precio } = req.body;

    const existeProducto = await Producto.findById(producto);

    let tipoExiste = await Tipo.findById(req.params.id);

    if (!tipoExiste) {
      return res.status(401).json({ msg: "No existe el tipo" });
    }

    if (existeProducto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Creo un objeto y lo relleno con los if () {}
    const nuevoTipo = {};

    if (nuevoTipo) {
      nuevoTipo.nombre = nombre;
    }
    if (nuevoTipo) {
      nuevoTipo.precio = precio;
    }

    tipoExiste = await Tipo.findOneAndUpdate(
      { _id: req.params.id },
      nuevoTipo,
      { new: true }
    );

    res.json({ tipoExiste });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};

exports.eliminarTipo = async (req, res) => {
  try {
    const { producto } = req.body;

    const existeProducto = await Producto.findById(producto);

    let tipoExiste = await Tipo.findById(req.params.id);

    if (!tipoExiste) {
      return res.status(401).json({ msg: "No existe el tipo" });
    }

    if (existeProducto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Tipo.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tipo eliminado " });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};
