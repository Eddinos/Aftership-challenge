const express = require('express');
const path = require('path');

const port = (process.env.PORT || 7777);

const app = express();
const publicPath = express.static(path.join(__dirname, 'public'));

app.use(publicPath);
app.get('/', function(_, res){ res.sendFile(__dirname + "/public/index.html"); })

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
