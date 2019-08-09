const express = require('express');
const DevController = require('./controllers/DevController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('Hello Adler!')
});

routes.post('/dev', DevController.store);

module.exports = routes;