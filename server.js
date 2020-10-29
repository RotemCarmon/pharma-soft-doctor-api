const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const xmlparser = require("express-xml-bodyparser");
const logger = require('./services/logger.service');
const fs = require('fs');

const prescriptionRoutes = require("./api/prescription/prescription.routes");

app.use(bodyParser.json());
app.use(xmlparser({ explicitArray: false, normalizeTags: false }));

app.use("/api/prescription", prescriptionRoutes);

app.get("/", (req, res) => {
  logger.debug('Connected')
  res.send("Doctor server is connected!!!");
});

app.get('/api/logs', (req,res) => {
  fs.readFile('./logs/backend.log', 'utf8', function(err, data) {
    if (err) throw err;
    res.send(data)
});
})

const port = process.env.PORT || 6060;
http.listen(port, () => {
  console.log('################################');
  console.log('>>>>>>>>>>>API SERVER<<<<<<<<<<<');
  console.log('################################');
  logger.info("Server is running on port: " + port);
});
