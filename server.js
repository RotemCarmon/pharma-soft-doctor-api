const express = require('express');
const app = express();
const http = require('http').createServer(app);
const xmlparser = require('express-xml-bodyparser');
const logger = require('./services/logger.service');
const fs = require('fs');

const prescriptionRoutes = require('./api/prescription/prescription.routes');

app.use(express.json());
app.use(xmlparser({ explicitArray: false, normalizeTags: false }));

app.use('/api/prescription', prescriptionRoutes);

app.get('/', (req, res) => {
    logger.debug('Connected');
    res.send('Doctor server is connected!!!');
});


app.get('/api/logs', (req, res) => {
    fs.readFile('./logs/backend.log', 'utf8', function (err, data) {
        if (err) logger.debug(err);
        res.format({
          'text/html': () => {
            res.send(`<pre>${data}</pre>`)
          }
        })
    });
});

const port = process.env.PORT || 6060;
let now = new Date();
http.listen(port, () => {
  
    console.log('################################');
    console.log('>>>>>>>>>>>API SERVER<<<<<<<<<<<');
    console.log('################################');
    logger.info('Server is running on port: ' + port);
});
