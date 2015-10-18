/**
* Areas.js
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
  	area: {
  		type: 'string',
  		required: true
  	},
  	activado: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  },
  beforeCreate: function(values,cb){
    // sails.sockets.blast('areas',values);
    cb()
  }
};

