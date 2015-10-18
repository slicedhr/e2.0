var crypto = require('crypto')

module.exports = function(){
	
	return crypto.randomBytes(5).toString('hex') +'-'+crypto.randomBytes(5).toString('hex') + '-'+(new Date().getTime());
}