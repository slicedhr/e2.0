var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * ClientesController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 Array.prototype.asyncForEach = function (each, done) {

    var i = -1, a = this;

    function iter() {

      if (++i === a.length) { done && done(); return; }

      each.call(a, a[i], iter);

    }

    iter();

 };



module.exports = {

	clienteSeguimientosOrdenados: function(req, res){

		var id = req.param('cliente');

		Clientes
			.findOne( { id: id } )
			.populate('seguimientos', { sort: 'id DESC' } )
			.populate('referidos')
			.populate('vendedor_asignado')
			.populate('contactos')
			.populate('cotizaciones')
			.populate('referido_por')
			.populate('categoriascliente')
			.populate('ciudad')
			.populate('pais')
			.then(function(cliente){
				return res.send(cliente)
			})
			.catch(function(err){
				return res.send(err)
			})

	},

	clientesPorCategoria: function(req, res){
		
		var where = actionUtil.parseCriteria(req),
		    limit = actionUtil.parseLimit(req),
		    skip = actionUtil.parseSkip(req),
		    sort = actionUtil.parseSort(req),
		    query = CC2P.find().where(where).limit(limit).skip(skip).sort(sort);

		  query = actionUtil.populateEach(query, req);
		  
		  query.exec(function(error, records) {

		    if (error) {
		      return res.serverError(error);
		    }

		    CC2P.count(where).exec(function(error, count) {

		      if (error) {
		        return res.serverError(error);
		      }

		      var metaInfo = {
		        start: skip,
		        end: limit,
		        limit: limit,
		        total: count,
		      };

		      var data = {
		        results: records,
		        info: metaInfo
		      }

		      return res.ok(data);
		    });
		  });

	},
	
	createCustomer: function(req,res){

		var categoriascliente = req.body.categoriascliente

		Clientes.create(req.body).exec(function(err, cliente){

			if (err) return res.send(err);

			if (categoriascliente && categoriascliente.length)

				categoriascliente.asyncForEach(function (categoria, callback) {

					var dataCatCliProd = {

						cliente: cliente.id,

						categoriacliente: categoria.categoriacliente,

						data: categoria.data || true,

					}

					

						CC2P
							.create(dataCatCliProd)
							.then(function(catcliprod){


								if (categoria.productos && categoria.productos.length){

									categoria.productos.asyncForEach(function(cat, cb){

										catcliprod.categoriasproductos.add(cat)

										catcliprod.save(function(){

											cb()

										})


									}, function(){ //done

										callback(cliente)

									})

								}

									// categoria.productos.asyncForEach(function (cat, cb){


									// 	// dataCatCliProd.categoriaproductos = cat


										

									// }, function(){

									// 	callback(cliente)

									// })

								else

									callback(cliente)


							}).catch(function(err){

								res.send(err)

							})


				}, function done(data) {

				  	Clientes.findOne( { id: cliente.id } )
						.populateAll()
						.then(function(cliente){

							CC2P.find({cliente: cliente.id, data: true})
							.exec(function(err, c2p){

								if (err) return res.send(err);

								cliente.categoriascliente = c2p

								return res.send(cliente)
							})




						})
					

				});

			else
				Clientes
				.findOne( { id: cliente.id } )
				.populateAll()
				.then(function(cliente){

					CC2P.find({cliente: cliente.id, data: true})
							.exec(function(err, c2p){

								if (err) return res.send(err);

								cliente.categoriascliente = c2p

								return res.send(cliente)
							})

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

