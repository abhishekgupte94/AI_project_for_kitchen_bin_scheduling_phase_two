// app.js
//Preseves original behavior from documentation but removes the logic into other .js files
const express = require("express");
const webhookRoutes = require("./routes/webhook.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("WhatsApp Kitchen Bin Scheduling Phase Two API is running.");
});

app.use("/webhook", webhookRoutes);

module.exports = app;