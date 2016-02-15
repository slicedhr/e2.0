/**
 * MensajesController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getMessages: function (req, res) {
		Mensajes.find(
		{
			where: {
				or: [
					{
						from: req.param('to'),
						to: req.param('from'),
					},
					{
						from: req.param('from'),
						to: req.param('to')
					}
				]
			},
			
		}
		).exec(function(err,mensajes){
			if (err){
				return res.send("error");
			}else{
				return res.send(mensajes);
			}
		});
		// return res.json({
		// 	from: req.param('from'),
		// 	to: req.param('to'),
		// });
	},
	setSeen: function(req,res){
		Mensajes.find({
			from: req.param('from'),
			to: req.session.user.id,
			seen: false
		}).exec(function(err,mensajes){
			if (err) return res.send('err',err);

			for (var i = 0; i < mensajes.length; i++) {
				// mensajes[i].seen = true
				Mensajes.update(mensajes[i].id,{seen:true}).exec(function(err,msjs){
					if (err) console.log(err)
				})
			};
			res.json({'ok':true})
			
		})
	},
	getUnread:function(req,res){
		Mensajes.find({to:req.session.user.id,seen:false}).populate('from').sort('from ASC').exec(function(err,mensajes){
		if (err) return res.send('err',err);
			return res.send(mensajes)
		})
	}
};

