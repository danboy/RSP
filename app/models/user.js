var mongoose = require("mongoose");
var sys = require("sys");
var schema = new mongoose.Schema({
    name  :  { type: String, default: 'anonymous' }
  , pass  :  { type: String}
  , date  :  { type: Date, default: Date.now }
 });

mongoose.model('User', schema); 
