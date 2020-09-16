const express = require('express');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/database')));
app.use('/', express.static(path.join(__dirname, '/client')));

const dataPath = 'https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json';
const dataPathAlso = 'https://sblakely01.github.io/dev/database/messages.json';

app.get('https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json', cors(), (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(JSON.parse(data));
  });
});

app.post('https://sblakely01.github.io/dev/database/messages.json', cors(), (req, res) => {
  fs.writeFile(dataPathAlso, JSON.stringify(req.body), err => {
    if (err) {
      console.log(err);
    }
    console.log('Done');
    res.sendStatus(200);
  })

})


// app.get('/api/location', cors(), (req, res) => {
//   data = [
//     {
//       latitude: 38.100769299999996,
//       longitude: -85.69483579999999
//     }
//   ]
//   res.json(data);
// });

// app.get('/api/getmessages/:latitude/:longitude', cors(), (req, res) => {
//   /* A database query will have to be done here that compares the
//   req.params.id (users location) to all of the locations in the database) */
//   data = [
//     {
//       message: "Hello World",
//       latitude: 38.100769299999996,
//       longitude: -85.69483579999999
//     }
//   ]
//   res.json(data);
// });

app.listen(port,  cors(), () => console.log('Server listening on ' + port));