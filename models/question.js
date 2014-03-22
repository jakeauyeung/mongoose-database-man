var mongodb = require('./db');

function Question(content) {
  this.name = content.name;
  this.password = content.password;
  this.email = content.email;
};

module.exports = Question;

//存储json信息
Question.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var content = {
      name: this.name,
      password: this.password,
      email: this.email
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 question 集合
    db.collection('question', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 question 集合
      collection.insert(content, {
        safe: true
      }, function (err, content) {
        mongodb.close();
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, content[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};


//读取信息
Question.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 Question 集合
    db.collection('question', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, question) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, question);//成功！返回查询的信息
      });
    });
  });
};
