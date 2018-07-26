const mongoose = require('mongoose');
const User = require('./user.js');

var options = {discriminatorKey: 'usertype'};

const authorSchema = new mongoose.Schema({
	firstname : {
		type: String
	}
},
options);

module.exports = User.discriminator('Author', authorSchema);