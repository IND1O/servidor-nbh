const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); //Detiene la app si hay un error.
  }
};

module.exports = conectarDb;
