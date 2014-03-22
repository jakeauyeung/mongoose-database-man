
/*
 * GET home page.
 */
var crypto = require('crypto'),
    fs = require('fs'),
    // Question = require('../models/question.js'),
    User = require('../models/user.js');

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('index', { 
			title: '数据库管理-登录',
			newUser: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
		});
	});
	app.post('/', function(req, res){
			//生成密码的 md5 值
  		var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
		  //检查用户是否存在
		  User.get({name:req.body.name,password:password}, function (err, users) {
		    if (!users) {
		      req.flash('error', '用户不存在!'); 
		      return res.redirect('/');//用户不存在则跳转到登录页
		    }
		    //检查密码是否一致
		    if (users.password != password) {
		      req.flash('error', '密码错误!'); 
		      return res.redirect('/');//密码错误则跳转到登录页
		    }
		    //用户名密码都匹配后，将用户信息存入 session
		    req.session.user = newUser;
		    req.flash('success', '登陆成功!');
		    res.redirect('/');//登陆成功后跳转到主页
		  });
	});
	app.get('/reg', function(req, res){
		res.render('reg', { 
			title: '数据库管理-注册',
			newUser: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
		});
	});
	app.post('/reg', function (req, res) {
	  var name = req.body.name,
	      password = req.body.password,
	      password_re = req.body['password-repeat'];
	  //检验用户两次输入的密码是否一致
	  if (password_re != password) {
	    req.flash('error', '两次输入的密码不一致!'); 
	    return res.redirect('/reg');//返回注册页
	  }
	  //生成密码的 md5 值
	  var md5 = crypto.createHash('md5'),
	      password = md5.update(req.body.password).digest('hex');
	  var newUser = {
	      name: req.body.name,
	      password: password,
	      email: req.body.email
	  };
	  
	  //检查用户名是否已经存在 
	  User.get({name: newUser.name}, function (err, users) {
	    if (users.toString()) {
	      req.flash('error', '用户已存在!');
	      return res.redirect('/reg');//返回注册页
	    }
	    // 如果不存在则新增用户
	    User.save(newUser, function(err){
		  	if(err){}
		  		req.session.user = newUser;//用户信息存入 session
		      req.flash('success', '注册成功!');
		      res.redirect('/');//注册成功后返回主页
		  });
	  });
	});
	app.get('/add', function(req, res){
			res.render('add', { 
				title: '数据库管理-添加',
				user: req.session.user,
		    success: req.flash('success').toString(),
		    error: req.flash('error').toString()
			});
		});
	app.post('/add', function(req, res){
		var content = req.body.userJson,
				json = JSON.parse(content);
		var newQuestion = new Question({
	      name: json.name,
	      password: json.password,
	      email: json.email
	  });
	  console.log(json);
		newQuestion.save(function (err, user) {
	      if (err) {
	        req.flash('error', err);
	        return res.redirect('/add');//注册失败返回主册页
	      }
	      req.flash('success', '添加成功!');
	      res.redirect('/add');//注册成功后返回主页
	    });
	});
	app.get('/logout', function (req, res) {
	  req.session.user = null;
	  req.flash('success', '登出成功!');
	  res.redirect('/');//登出成功后跳转到主页
	});
}
