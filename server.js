require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.static("public")); // Servir archivos estáticos

// Ruta para obtener el clima de una ciudad con WeatherAPI
app.get("/clima", async (req, res) => {
  try {
    const ciudad = req.query.ciudad;
    if (!ciudad) {
      return res.status(400).send("Falta el parámetro de la ciudad");
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ciudad}&lang=es`;
    const respuesta = await axios.get(url);

    res.json(respuesta.data);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el clima" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
