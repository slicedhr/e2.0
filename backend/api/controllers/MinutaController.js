/**
 * MinutaController
 *
 * @description :: Server-side logic for managing minutas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	

	cancelarSeguimientos: function(req, res){

		Tasks.query("UPDATE tasks SET success=1 WHERE success=0 AND cliente=" + req.param('cliente'),function(err, tasks){

				if (err)
						return res.send(err)

				Clientes.update({ id: req.param('cliente') },{ seguimientosactivos: false })
						.exec(function(err, cliente){
							if (err)
								return res.send(err)

							var minuta = {
						        titulo: 'Se cancelaron los seguimientos',
						        minuta: 'Se han cancelado los seguimientos para este cliente.',
						        general: true,
						        cliente: cliente[0].id,
						        vendedor: cliente[0].vendedor_asignado,
						        addicionalData: {
						        	canceladoPor: req.param('vendedor')
						        }
						    }

							Minuta.create(minuta)
								.exec(function(err, minuta){

									if (err) return res.send(err)

									minuta.cliente = cliente[0]

									return res.send(minuta)


								})

							
						})

			})

	}

};

