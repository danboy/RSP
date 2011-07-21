//TODO Separate this logic and try to make it smarter , autoload based on files present etc

module.exports.setup = function(o){
  var sys = require("sys"),
      app = o.app,
      mongoose = o.mongoose,
      express = o.express;
  
  Server.paths = o.paths;
  
  global.db = mongoose.connect("mongodb://localhost/rsp");
  
  require("./models.js").autoload(db);
  require("./controllers.js").autoload(app);
  require("./routes.js").draw(app);
  
  app.configure(function(){
  	app.set('view engine','hbs');
    app.set('views', o.paths.views);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compiler({ src: o.paths.root, enable: ['less'] }));
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'brains' }));
    app.use(app.router);
    app.use(express.static(o.paths.root));
  });

  app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.bodyParser());
  });

  app.configure('production', function(){
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
    app.use(express.errorHandler());
  });
  
  app.listen(o.port || 3030);
  
};
