const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
require("dotenv").config();

const apiRoute = require("./routes/routes");
const inventaryRoute = require("./routes/inventary.route");
const userRoute = require("./routes/client.route");
const kanbanRoute = require("./routes/kanban.route");
const pdfController = require("./controllers/pdfController");
const triggerController = require("./controllers/TriggerController");

// Conexión DB
require('./database');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json()); 
app.use(express.json());
app.use(cors());

// Rutas
app.use("/whatsapp", triggerController);
app.use("/whatsapp", pdfController);
app.use("/whatsapp", apiRoute);
app.use("/whatsapp", inventaryRoute);
app.use("/whatsapp", userRoute);
app.use("/whatsapp", kanbanRoute);

// Escuchar
const port = process.env.PORT || 3047;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
