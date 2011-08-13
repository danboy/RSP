db = require('mongoose');
express = require('express');
app.use(express.bodyParser());
var crypto = require('crypto');
var actions = {};


User = db.model('User');

actions.index = function(request,response){
  User.find({},function(err,users){
    response.render('users/index',{
      results: users,
      total: users.length,
      properties: app.props
    });
  });
};

actions.new = function(request,response){
  response.render('users/new',
    {
    properties: app.props
    });
};

actions.create = function(request,response){
  if(request.body.user){
    user = new User(request.body.user);
    console.log(user);
    user.pass = crypto.createHash('md5').update(user.pass).digest("hex");
    user.save(function(err){
      console.log('created a user.')
      app.io.sockets.on('connection', function (socket) {
        socket.emit('user', { 'name': user.name });
      });
    });
    response.redirect('users/show/'+user.id);
  }else{
    response.redirect('users/new');
  }
};

actions.destroy = function(request,response){
  User.findById( request.params.id , function(err,user){
    if(!err){
      user.remove();
      user.save();
      app.io.sockets.on('connection', function (socket) {
        socket.emit('user', { 'name': user.name });
      });
    }
    response.render('users/destroy',{
      user: user.name,
      message: 'user was deleted'
    });
  });
};

actions.show = function(request,response){
  currentTime = new Date();
  User.findById( request.params.id , function(err,user){
    app.io.sockets.on('connection', function (socket) {
      socket.emit('user', { 'name': user.name , 'message': 'user viewed their profile', 'time': currentTime });
    });
    response.render('users/show',{
      user: user.name,
      id: user.id,
      properties: app.props
    });
  });
};

module.exports = actions;
