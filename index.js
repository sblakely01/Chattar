const express = require('express');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3006;
const path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");



app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/client')));

const dataPath = 'https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json';
const dataPathAlso = 'https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json';

app.get('https://raw.githubusercontent.com/sblakely01/sblakely01.github.io/dev/database/messages.json', (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.send(JSON.parse(data));
  });
});

app.put('https://raw.githack.com/sblakely01/sblakely01.github.io/dev/database/messages.json', cors(), (req, res) => {
  req.headers()
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