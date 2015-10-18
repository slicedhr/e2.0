/**
 *
 * @description :: Server-side logic for managing areas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var users = {}

module.exports = {
	auth: function (req, res) {
		var email = req.param('email');  
		var password = req.param('password');
		Usuarios.findOne({email: email,password: password}).exec(function(err,user){

			if (err) return res.send('Err',err);

			else{

				if (user === undefined ) return res.json({'NotFound':1});

				user.socket = sails.sockets.id(req.socket);

				var user = user.toObject();

				delete user.password;

				sails.users[user.id] = user;

				req.session.user = user;

				req.session.authenticated = true;

				var tempUsers = []
				for (var i = sails.users.length - 1; i >= 0; i--)
					if(sails.users[i])
						tempUsers.push(sails.users[i])

				sails.sockets.blast('conectado',tempUsers);

				return res.send(user);
			}
		})
	},
	authenticated: function(req,res){
		if (req.session.authenticated){

			sails.users[req.session.user.id] = req.session.user;

			var tempUsers = []
				for (var i = sails.users.length - 1; i >= 0; i--)
					if(sails.users[i])
						tempUsers.push(sails.users[i])

			sails.sockets.blast('conectado',tempUsers);	

			return res.json(req.session.user);
		}
		else return res.send('Not Found');
	},
	logout: function(req,res){

		req.session.authenticated = false;

		sails.users[req.session.user.id] = null;

		req.session.user = null;

		var tempUsers = []
		for (var i = sails.users.length - 1; i >= 0; i--)
			if(sails.users[i])
				tempUsers.push(sails.users[i])

		sails.sockets.blast('conectado',tempUsers);

		return res.send('ok');
	}
};

