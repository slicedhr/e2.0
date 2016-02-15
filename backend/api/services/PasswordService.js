var crypto = require('crypto');

var SaltLength = 9;

var set = 'A554CD3449F9E3E9C4E6CBC7C4DE5';

function createHash (password, cb){

	var salt = generateSalt(SaltLength),

		hash = md5(password + salt);

	cb(salt +  hash)
}

function validateHash (password, hash){

	var salt = hash.substr(0, SaltLength),

		validHash = salt + md5(password + salt);

	return hash === validHash;

}

function md5 (string){

	return crypto
			.createHash('md5')
			.update(string)
			.digest('hex');

}

function generateSalt(len){

	var	setLen = set.length,
		salt = '';

	for (var i = 0; i < len; i++) {
		var p = Math.floor(Math.random() * setLen)
		salt += set[p]
	};

	return salt;
}

module.exports = {
	'hash': createHash,
	'validate': validateHash
}