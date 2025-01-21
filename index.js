const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const connection = require('./src/db/connection');
require('dotenv').config();

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Server online on port ${port}`);
})

//Connect to mongoDB
connection();