/*
  TODO: This is quick and dirty, should obviously refactor the hell out of this
*/

var match = function(url,handler,method){
  handler = handler || "site#index";
  
  var parts = handler.split(/\#/),
      util = require("./util"),
      controller = parts.shift(),
      action = parts.shift(),
      sys = require('sys'),
      method = method || "get";

  if(!controller.match(/_controller$/)){
    if (controller == 'site') {
        controller = 'Index';
    }
    controller = controller + "Controller";
  }
  
  sys.puts(sys.inspect(Server.controllers.controller_objects));
  sys.puts(sys.inspect(controller));

  var controller_id = util.camelize(controller),
      action_handler = Server.controllers.controller_objects[controller][ action ];
  
  //add the handler for the url
  if(url && action_handler){
    app[method](url,action_handler);
  }
};


module.exports.draw = function(app){
  match("/");
  match("/index");
  match("/users","Users#index");
  match("/users/new","Users#new");
  match("/users/show/:id","Users#show");
  match("/users","Users#create", "post");
  match("/users/destroy/:id","Users#destroy");
};

