const express = require("express");
const morgan = require('morgan');
const { Client, LocalAuth } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');

const apiRoute = require("./routes/routes");
const inventaryRoute = require("./routes/inventary.route");
const userRoute = require("./routes/client.route");
const kanbanRoute = require("./routes/kanban.route");
const pdfController = require("./controllers/pdfController")
const triggerController = require("./controllers/TriggerController")

const {Server} = require("socket.io");

const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

const http = require("http");

//Initialize
require('./database');
const app = express();
require("dotenv").config();
const allSessionsObject  ={};

const httpServer = http.createServer(app);
const socketIO = new Server(httpServer, {
  cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT || 3055;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.set('Port', 3023);
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use("/whatsapp", triggerController);
app.use("/whatsapp", pdfController);
app.use("/whatsapp", apiRoute);
app.use("/whatsapp", inventaryRoute);
app.use("/whatsapp", userRoute);
app.use("/whatsapp", kanbanRoute);

const port = process.env.PORT || 3041;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

