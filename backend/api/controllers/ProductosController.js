/**
 * ProductosController
 *
 * @description :: Server-side logic for managing productos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
};

