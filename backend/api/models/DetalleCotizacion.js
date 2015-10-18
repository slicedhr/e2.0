/**
* DetalleCotizacion.js
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
  	producto: { //ASSOC
  		model: 'Productos'
  	},
  	cantidad: {
  		type: 'float',
  	},
  	precio: {
  		type: 'integer',
  	},
  	iva: { 
      type: 'integer',
    },
    utilidad_bruta: { 
      type: 'integer',
    },
  	descuento: {
  		type: 'integer',
  	},
  	cotizacion: { //ASSOC
  		model: 'Cotizaciones',
  	},

  }
};

