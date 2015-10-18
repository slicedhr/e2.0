/**
 * ClientesController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req,res){
		Clientes.create(req.body).populateAll().exec(function(err,data){
			if (err) return res.send(err);
			
			Clientes.findOne({id:data.id}).populateAll().exec(function(err,cliente){
				if (err) return res.send(err);
				console.log(cliente)
				return res.send(cliente)
			})

		})
	},

	multiupdate: function(req,res){
		
		var ids = req.allParams().data;

		for (var i = ids.length - 1; i >= 0; i--) {
			Clientes.update({id: ids[i] },{vendedor_asignado: req.param('id')}).exec(function(err,query){
				if (err) console.log(err);

			});
		};

		return res.json({
			response: true
		})
	},
	getAndPaginate : function(req,res){
		var condicion = {}
			if (!req.session.user.permissions.admin) condicion.vendedor_asignado = req.param('idVendedor');
		Clientes.find(condicion).paginate({page: req.param('pagina'), limit: 50}).populate('vendedor_asignado').populate('pais').populate('ciudad').exec(function(err,clientes){
			if(err) return res.send(err);

			return res.send(clientes)
		})

		/*
			//steps
		1) 
			si now 
		*/


	// Clientes.find(condicion).exec(function(err,clientes){
	// 		if(err) return res.send(err);
	// 		return res.send(clientes)
	// 	})
	},
	count: function(req, res){
			// if (req.session.user.permissions.admin) console.log('true');
		var condicion = {}
		console.log(req.session.user)
		if (!req.session.user.permissions.admin) condicion.vendedor_asignado = req.param('id');
		Clientes.count(condicion).exec(function(err,total){
			if(err) return res.send(err)
			return res.json({total:total})
		})
	},

	consultaCliente: function(req,res){

		var id = req.param('id')

		var response = {}

		Clientes.findOne({id:id}).populate('vendedor_asignado').populate('ciudad').populate('pais').exec(function(err,cliente){

			if(err) return res.send('err',err);

			response.cliente = cliente;

			
			Cotizaciones.find({cliente: id}).populateAll().exec(function(err,cotizaciones){

				if (err) return res.send('err',err)

				response.cotizaciones = cotizaciones

				Usuarios.find({}).exec(function(err,vendedores){

					if (err) return req.res('err',err)

					response.vendedores = vendedores

					CategoriasProductos.find({}).exec(function(err,categorias){

						if (err) return req.res('err',err)
						
						response.categorias = categorias

						

						TerminosDePago.find({}).exec(function(err,terminos){

							if (err) return req.res('err',err)

							response.terminosdepago = terminos
						
							return res.send(response);
							
						})
					})
				})
			})
		})
	}
};

