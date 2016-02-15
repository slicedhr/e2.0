/**
* ListadoDeEPS.js
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
    eps: {
    	type: 'string'
    },
    usuario:{
      collection:'Usuarios',
      via:'eps'
    },
    activado: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  }
};

