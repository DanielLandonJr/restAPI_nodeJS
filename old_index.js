const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

// create the server
const server = restify.createServer();

// MiddleWare
server.use(restify.plugins.bodyParser());

// start listening with the server on the port we specified in the config file
server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

// setup db object
const db = mongoose.connection;

// deal with db errors
db.on('error', error => {
  console.log(error);
});

// open databsae
db.once('open', () => {
  // we are going to have various routes
  require('./routes/Customers')(server);
  console.log(`Server Started On Port ${config.PORT}`);
});
