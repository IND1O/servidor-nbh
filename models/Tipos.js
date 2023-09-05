const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
  },
});

module.exports = mongoose.model("Tipo", TareaSchema);
