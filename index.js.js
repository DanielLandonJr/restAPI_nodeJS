const restify = require('restify');
const config = require('./config');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// server configuration
var server = restify.createServer({
  name: config.SERVER_NAME
});

// start the server
server.listen(config.PORT, function() {
  // this is your custom Response...if you want to change the data or how the server responds modify this file
  require('./HHGG')(server);

  // clear the console
  clear();

  // simple messages
  console.log(
    chalk.magenta(figlet.textSync(server.name, { horizontalLayout: 'default' }))
  );
  console.log(chalk.blue(config.URL));
});
