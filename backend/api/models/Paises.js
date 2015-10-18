/**
* Paises.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id:{
  		type:'integer',
  		primaryKey: true,
  		autoIncrement: true
  	},
  	nombre: {
  		type: 'string',
  		required: true
  	},
    ciudades: {
      collection: 'Ciudades',
      via: 'pais'
    },
    impuestos: {
      collection: 'OtrosImpuestos',
      via: 'pais_del_impuesto'
    },
    clientes: {
      collection: 'Clientes',
      via: 'pais'
    },
    proveedores: {
      collection: 'Proveedores',
      via: 'pais'
    },

  }
};

