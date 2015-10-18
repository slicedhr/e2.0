/**
 * CiudadesController
 *
 * @description :: Server-side logic for managing ciudades
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getByCountry: function(req,res){
		Ciudades.find({pais:req.param('id_pais')}).exec(function(err,data){
			if (err) return res.send(err);

			return res.send(data);
		})
	}
};

