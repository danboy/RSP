var mongoose = require("mongoose");
var sys = require("sys");
var schema = new mongoose.Schema({
    name        :  { type: String, default: 'anonymous' }
  , challenge   :  { type: String}
  , date        :  { type: Date, default: Date.now }
 });

mongoose.model('Game', schema); 
