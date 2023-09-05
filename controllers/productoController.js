const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

///////////////////////////////////////////////////////////////////////////////////////////

exports.crearProducto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const producto = new Producto(req.body);

    //GUARDAR CREADOR VIA JWT: //
    producto.creador = req.usuario.id;

    producto.save();

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////

exports.obtenerProductos = async (req, res) => {
  try {
    const producto = await Producto.find({
      creador: req.usuario.id,
    }).sort({ creado: -1 });
    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo  un error");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////

exports.actualizarProducto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre, descripcion, imagen } = req.body;
  const nuevoProducto = {};

  if (nombre) {
    nuevoProducto.nombre = nombre;
  }
  if (descripcion) {
    nuevoProducto.descripcion = descripcion;
  }
  if (imagen) {
    nuevoProducto.imagen = imagen;
  }

  try {
    let respuesta = await Producto.findById(req.params.id);

    if (!respuesta) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (respuesta.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    respuesta = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProducto },
      { new: true }
    );

    res.json({ respuesta });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////

exports.eliminarProducto = async (req, res) => {
  try {
    let respuesta = await Producto.findById(req.params.id);

    if (!respuesta) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    if (respuesta.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    await Producto.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Producto eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
