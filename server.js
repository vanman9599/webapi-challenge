const express = require('express');
const projectRouter = require('./api/projectRouter.js');
const actionRouter = require('./api/actionRouter.js');
const server = express();


server.use(express.json());
server.use('./api/projects', projectRouter);
server.use('./api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('<h2>WebApi Sprint Challenge</h2>');
})