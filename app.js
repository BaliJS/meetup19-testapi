var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testapi', function(err) {
	console.log(err);
});

app.get('/', function(req, res) {
	res.json({msg: 'test API'});
});


const User = require('./user.js');

app.get('/users', async function(req, res) {
	try {
		//let User = new User();
		let users = await User.find();
		res.json({status: true, data: users});
	} catch (err) {
		res.json({status: false, msg : err.message})
	}
})

app.post('/users', async function(req, res) {
	try {
		let user = new User(req.body);
		let newUser = await user.save();
		res.status(201).json({status : true, data: newUser})
	} catch (err) {
		res.json({status: false, msg : err.message})
	}
	


});


const  Blog = require('./blog');

app.get('/blogs', async function(req, res) {
	try {
		//let User = new User();
		let blogs = await Blog.find().populate('user');
		res.json({status: true, data: blogs});
	} catch (err) {
		res.json({status: false, msg : err.message})
	}
})

app.post('/blogs', async function(req, res) {
	try {
		let blog = new Blog(req.body);
		let newBlog = await blog.save();
		res.status(201).json({status : true, data: newBlog})
	} catch (err) {
		res.json({status: false, msg : err.message})
	}
	


});

const Author = require('./author.js');
app.post('/authors', async function(req, res) {
	try {
		let author = new Author(req.body);
		let newAuthor = await author.save();
		res.status(201).json({status : true, data: newAuthor})
	} catch (err) {
		res.json({status: false, msg : err.message})
	}
	


});

app.listen(3000, function() {
	console.log('listening port 3000');
});