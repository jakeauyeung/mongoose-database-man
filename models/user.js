var mongodb = require('./db');

var Schema = mongodb.mongoose.Schema({
  name: String,
  password: String,
  email: String
})

var userModel = mongodb.mongoose.model('user', Schema);

var User = function(){}

module.exports = new User();

User.prototype.save = function(obj, callback){
  var insertUser = new userModel(obj);
  insertUser.save(function(err){
    callback(err);
  });
}

User.prototype.get = function(name, callback){
  userModel.find(name, function(err, data){
    callback(err,data);
  });
}


