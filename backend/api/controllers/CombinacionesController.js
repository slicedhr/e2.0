/**
 * CombinacionesController
 *
 * @description :: Server-side logic for managing combinaciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 Array.prototype.asyncForEach = function (each, done) {

    var i = -1, a = this;

    function iter() {

      if (++i === a.length) { done && done(); return; }

      each.call(a, a[i], iter);

    }

    iter();

 }

module.exports = {

	crearCombinacion: function(req, res){

		var combinaciones = req.body.productos, toReturn;

		Combinaciones
			.create(req.body)
			.then(function(combinacion){

				toReturn = combinacion

				combinaciones.asyncForEach( function(element, callback) {
					
					combinacion.productos.add(element.id)

					combinacion.save(function(){
						callback(combinacion)
					})


				}, function(done){

					return res.send(combinacion)

				});

			}).catch(function(err){
				return res.send(err)
			})

	}
	
};

