const Express = require('express');

const Router = Express.Router();

const NameController = require('../controllers/nameController');

Router.get('/', NameController.getNames);

Router.post('/', NameController.createName);

module.exports = Router;
