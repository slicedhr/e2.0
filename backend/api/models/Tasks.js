/**
* Tasks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
  		autoIncrement: true
  	},
  	to: {
  		model:'Usuarios'
  	},
    title: 'string',
  	task: 'text',
  	href: 'string',
    justification: 'text',
  	success: 'boolean',
  	evidencia: 'json',
  	alarm: 'date',
    cliente: 'integer',
    contacto: 'integer',
    extra: 'json'
  },
  afterUpdate: function(data,next){
    // if (data.cliente){
    //   Clientes.update({id: data.cliente},{ultimo_seguimiento: sails.moment().format()}).exec(function(err,cliente){
    //     //Add Seguimiento, add Task;
    //     var randomDay = Math.floor((Math.random() * 4));
    //     cliente = cliente[0]
    //     var seguimiento = {
    //           cliente: cliente.id,
    //           estado: 4,
    //           minuta: data.justification,
    //           programar_visita: new Date(sails.moment().add(15,'day').subtract(randomDay,'day').format()),
    //           titulo: "Se hizo seguimiento",
    //           vendedor: cliente.vendedor_asignado,
    //           contacto: data.contacto
    //       }
      
    //     Minuta.create(seguimiento).exec(function(err,minuta){
    //       if (err) console.log(err)
    //     })
    //   })
    // }
    next()
  }

};
