/**
* Mensajes.js
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
    from: {
    	model: 'Usuarios' 
    },
    to: {
    	model: 'Usuarios'
    },
    message: {
    	type: 'text',
    	required: true
    },
    seen: {
      type: 'boolean',
      defaultsTo: false
    },
  },
  beforeCreate: function(values,cb){
    Usuarios.findOne({id:values.from}).exec(function(err,user){
      var data = values
      delete data['password']
      data.from = user
      sails.sockets.blast('mensaje',data);
    })
    cb()
  }
};

