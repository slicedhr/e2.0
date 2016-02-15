/**
* Bodegas.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
    	type: 'string',
    	required: true
    },
    ubicacion: {
    	type: 'string',
    	required: true
    },
    productos: {
      collection: 'Productos',
      via: 'bodega'
    },
    activado: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  }
};

