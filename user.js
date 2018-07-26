const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var options = {discriminatorKey: 'usertype'};

const userSchema = new mongoose.Schema({
	userid : {
		type: String,
		required: true,
		unique: true,
	},
	password : {
		type: String,
		select: false
	}
},
options);

userSchema.pre('save', async function(next) {
	//console.log('pre save');
	try {
		user = this;
		if(this.isModified('password') || this.isNew) {
			user.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		return next(err);
	}
})

module.exports = mongoose.model('User', userSchema);