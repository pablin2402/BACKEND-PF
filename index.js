const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

// DB
require("./database");

// Routes / Controllers montados como routers
const apiRoute = require("./routes/routes");
const inventaryRoute = require("./routes/inventary.route");
const userRoute = require("./routes/client.route");
const pdfController = require("./controllers/pdfController");
const triggerController = require("./controllers/TriggerController");

const app = express();

// Middlewares base
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

// Debug útil (NO rompe nada)
console.log("SERVER START");
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

// Rutas
app.use("/whatsapp", triggerController);
app.use("/whatsapp", pdfController);
app.use("/whatsapp", apiRoute);
app.use("/whatsapp", inventaryRoute);
app.use("/whatsapp", userRoute);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, jwtSecretLoaded: !!process.env.JWT_SECRET });
});

// Escuchar
const port = process.env.PORT || 3051;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
