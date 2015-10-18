/**
* OtrosImpuestos.js
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
    detalle_del_impuesto: {
    	type: 'string'
    },
    porcentaje: {
    	type: 'integer'
    },
    resolucion: {
    	type: 'string'
    },
    vigencia_del_impuesto: {
    	type: 'string'
    },
    pais_del_impuesto: {
    	model: 'Paises'
    },
    activado: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  }
};

