const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || 8088;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(`${__dirname}/dist`));

// send the user to index html page in spite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const server = https.createServer({
  key: fs.readFileSync('../certs/89.223.95.49.key'),
  cert: fs.readFileSync('../certs/89.223.95.49.cert')
}, app)

server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
