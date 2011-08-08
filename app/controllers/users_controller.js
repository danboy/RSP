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
      var buffer = [];
      app.io.sockets.on('connection', function (socket) {
        socket.send({ buffer: buffer });
        socket.emit('user', { 'name': user.name });
        buffer.push(user);
      });
    });
    response.render('users/show',{
      user: user.name,
      properties: app.props
    })
  }else{
    response.redirect('users/new');
  }
};

module.exports = actions;
