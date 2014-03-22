var mongodb = require('./db');

var Schema = mongodb.mongoose.Schema({
  name: String,
  password: String
});

var questionModule = mongodb.mongoose.model('question', Schema);

var Question = function(){}

module.exports = new Question();

Question.prototype.save = function(obj, callback){
  var insertQuestion = new questionModule(obj);
  insertQuestion.save(function(err){
    callback(err);
  })
}

Question.prototype.get = function(name, callback){
  questionModule.find(name, function(err, data){
    callback(err, data);
  })
}

Question.prototype.getAll = function(callback){
  questionModule.find(function(err, data){
    callback(err, data);
  })
}