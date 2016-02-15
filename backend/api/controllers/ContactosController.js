/**
 * ContactosController
 *
 * @description :: Server-side logic for managing contactos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAndPopulate: function(req, res){

		Contactos
			.find( { cliente: req.param('cliente') } )
			.populate('minuta', { sort: 'id DESC' })
			.then(function(contactos){
				return res.send(contactos)
			})
			.catch(function(err){
				return res.send(err)
			})

	}
};

