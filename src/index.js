const Express = require('express');

const App = Express();
const httpServer = require('http').createServer(App);
const io = require('socket.io')(httpServer);
const path = require('path');
const Mongoose = require('mongoose');

require('dotenv').config();

const ConnectionString = process.env.CCSTRING;

const NameRouter = require('./routes/nameRouter');

const NameService = require('./services/nameService');

App.use(Express.json());

App.use(Express.urlencoded({ extended: false }));

App.use('/', Express.static(path.join(__dirname, '../public')));

App.use('/api/v1.0/Names', NameRouter);

App.use((request, response) => {
  response.status(404).json({ status: 404, message: 'Page not found' });
});

(async () => {
  await Mongoose.connect(ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();

io.on('connection', (client) => {
  client.on('suggestion', async (suggestion) => {
    NameService.createName({ Name: suggestion });
    const users = await NameService.getNames('');
    io.emit('getSuggestions', JSON.stringify(users));
  });

  client.on('request', async (entry) => {
    const suggestion = entry || '';
    const users = await NameService.getNames(suggestion);
    client.emit('getSuggestions', JSON.stringify(users));
  });
});

httpServer.listen(process.env.NODE_PORT);
