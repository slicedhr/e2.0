/**
 * WilcatecFormController
 *
 * @description :: Server-side logic for managing wilcatecforms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req,res){
		console.log('entre!')
		var ip = req.headers['x-forwarded-for'] || 
	     req.connection.remoteAddress || 
	     req.socket.remoteAddress ||
	     req.connection.socket.remoteAddress;

	     var data = {
	     	nombre: req.param('nombre'),
	     	cargo: req.param('cargo'),
	     	ciudad: req.param('ciudad'),
	     	pais: req.param('pais'),
	     	telefono: req.param('telefono'),
	     	celular: req.param('celular'),
	     	comentarios: req.param('comentarios'),
	     	email: req.param('email'),
	     	ip: ip,
	     	seen: false
	    }

	    // Notification

		WilcatecForm.create(data).exec(function(err,data){
			if (err) return res.send('Err: ',err)
			return res.send(data)
		})
	}
};

