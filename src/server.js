const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb+srv://adler:qWh0xIt2TN6zUddq@cluster0-4zgaf.mongodb.net/omnistack8?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

const routes = require('./routes');
const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);
