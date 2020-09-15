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

const dataPath = "./database/messages.json";

app.get('/api/messages', (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }

    res.send(JSON.parse(data));
  });
});


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

app.listen(port,  () => console.log('Server listening on ' + port));