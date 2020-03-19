var dotenv = require('dotenv').config();
var cors = require('cors')

var bodyParser = require("body-parser");

const express = require("express");
const app = express();

var port = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./routes/routes')(app);

app.listen(port, () => {
    console.log("Server listening on port..." +port);
})