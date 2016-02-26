/**
 * ProductosController
 *
 * @description :: Server-side logic for managing productos
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
	getAndPaginate : function(req,res){
		var condicion = {}
			Productos.find(condicion).paginate({page: req.param('pagina'), limit: 50}).exec(function(err,productos){
			if(err) return res.send(err);
			return res.send(productos)
		})
	// Productos.find(condicion).exec(function(err,productos){
	// 		if(err) return res.send(err);
	// 		return res.send(productos)
	// 	})
	},

	crearDescuentos: function(req, res){

		var descuentos = req.body.descuentos;

		var producto = req.body.producto

		var sendDescuendos = []


		descuentos.asyncForEach(function(descuento, cb){

			var tempDescuento = {
				descuento: descuento.descuento,
				producto: producto,
				categoriacliente: descuento.categoriacliente
			};

			Descuentos
				.create(descuento)
				.then(function(discount){

					sendDescuendos.push(discount)

					cb()

				})

		}, function done(done){

			return res.send(sendDescuendos)

		})




	},
	editarDescuentos: function(req, res){

		var descuentos = req.body.descuentos;

		var sendDescuentos = []

		descuentos.asyncForEach(function(descuento, cb){

			Descuentos
				.update({ id: descuento.id }, descuento)
				.then(function(discount){

					sendDescuentos.push(discount)

					cb()

				})
				.catch(function(err){

					return res.send(err)
					
				})

		}, function done(){

			return res.send(sendDescuentos)
		})
	}
};

