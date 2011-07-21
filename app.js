require("./lib/underscore");
/**
 * Module dependencies.
 */

var Server = {},
    express = require("express"),
    path = require("path"),
    application_root = __dirname;

global.Server = Server;
Server.root = application_root;
global.app = express.createServer();

Server.setup = require("./lib/setup.js").setup({
  app: app, 
  mongoose : require("mongoose"),
  express : express,
  paths : {
    views :  path.join(application_root,"app","views"),
    root : path.join(application_root,"public"),
    controllers : path.join(application_root,"app","controllers"),
    models : path.join(application_root,"app","models")
  }
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
