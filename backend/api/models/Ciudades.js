/**
* Ciudades.js
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
    pais: {
      model: 'Paises'
    },
    region: {
      type:'integer'
    },
    proveedores: {
      collection: 'Proveedores',
      via: 'ciudad'
    },
    clientes: {
      collection: 'Clientes',
      via: 'ciudad'
    }
  }
};

