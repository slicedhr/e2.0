/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
// var json2xls = require('json2xls');
var fs = require('fs')
module.exports = {
	test: function(req,res){
		Proveedores.find({}).exec(function(err,data){
			if(err) return res.send(err)

				var fields = ['id','nit','razon_social','representante_legal','responsable_delegado','ciudad','pais','direccion','telefono_fijo','celular','email','comentarios','distribuidor','natural','num_empleados','website','vendedor_asignado','ultimo_seguimiento','fecha_asignado','activado','createdAt','updatedAt']

				// json2csv({ data: data, fields: fields }, function(err, csv) {
				//   if (err) console.log(err);
				//   console.log('ok')
				//   fs.writeFile('file.csv', csv, function(err) {
				//     if (err) console.log(err);
				//     console.log('file saved');
				//     return res.send('ok2')
				//   });
				// });

			// var xls = json2xls(data,{fields: fields});

			// fs.writeFileSync('data.xlsx', xls, 'binary');

			// console.log('ok')
			res.send('ok')

		})
	},
	getProfile: function(req,res){
		var id = req.param('id')
		res.send('hi there!');
	},
	uploadImage: function(req,res){
		var options = {}
		options.uploadFile = req.file('file')
		options.type = 'profile_image'
		options.user_id = req.session.user.id
		options.name = req.session.user.id +'_'+(req.session.user.first_name).replace(/\s/g, "_")+'_'+(req.session.user.last_name).replace(/\s/g, "_");

	    UploadFileService.uploadFile(options,function(data){ 	
	    	return res.send(data)
	    })
	    
	},
	updatePassword: function(req,res){

		var oldpassword = req.param('oldpassword')
		var newpassword = req.param('newpassword')

		Usuarios.findOne({id:req.session.user.id,password:oldpassword}).exec(function(err,user){
			if (err) return res.send(err);
			if (!user) return res.json({badpassword: 1})
			
			Usuarios.update({id:req.session.user.id},{password:newpassword}).exec(function(err,user){
				if (err) return res.send(err)

				if (user) return res.send(user)
			})
			
		})
	}
};

