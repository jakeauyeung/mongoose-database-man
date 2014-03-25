var mongodb = require('./db');

var Schema = mongodb.mongoose.Schema({
  id: Number,
  recommend: Number,
  title: String,
  detail: String,
  themes: {
    title: String,
    theme: Array
  },
  results: Array
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