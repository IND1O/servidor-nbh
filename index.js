const express = require("express");
const conectarDb = require("./config/db");
const cors = require("cors");

const app = express();

conectarDb();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.port || 8080;

// app.get("/", (req, res) => {
//   res.send("API Nuestro Barrio H...");
// });

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/tipos", require("./routes/tipos"));

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto: "${port}"`);
});
