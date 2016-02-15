/**
* Arp.js
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
  	proveedor_de_servicio:{
  		type:'string',
  		required: true
  	},
  	activado:{
  		type:'boolean',
  		defaultsTo: false
  	},
    usuario: {
      collection: 'Usuarios',
      via:'arp'
    }
  }
};

