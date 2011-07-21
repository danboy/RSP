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
      total: users.length
    });
  });
};

actions.new = function(request,response){
  response.render('users/new');
};

actions.create = function(request,response){
  if(request.body.user){
    user = new User(request.body.user);
    console.log(user);
    user.pass = crypto.createHash('md5').update(user.pass).digest("hex");
    user.save(function(err){
      console.log('created a user.')
    });
    response.render('users/show',{
      user: user.name
    })
  }else{
    response.redirect('users/new');
  }
};

module.exports = actions;
