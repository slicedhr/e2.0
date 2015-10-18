/**
 * ProveedoresController
 *
 * @description :: Server-side logic for managing proveedores
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAndPaginate : function(req,res){
		var condicion = {}
		Proveedores.find(condicion).paginate({page: req.param('pagina'), limit: 50}).exec(function(err,proveedores){
			// console.log(proveedores)
			if(err) return res.send(err);
			return res.send(proveedores)
		})
	// Proveedores.find(condicion).exec(function(err,proveedores){
	// 		if(err) return res.send(err);
	// 		return res.send(proveedores)
	// 	})
	},
};

