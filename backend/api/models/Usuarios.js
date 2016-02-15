/**
* Usuarios.js
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
    email: {
    	type: 'email',
    	required: true,
    	unique: true
    },
    password: 'string',
  	permissions: 'json',
  	last_login: {
  		type: 'datetime'
  	},
  	first_name: {
  		type: 'string',
  		required: true
  	},
  	last_name: {
  		type: 'string',
  		required: true
  	},
  	profile_image: {
  		type: 'string',
  		defaultsTo: 'default_avatar.png'
  	},
  	chat_sound: {
  		type: 'string',
  		defaultsTo: 'Ariel'
  	},
  	cedula: {
  		type: 'string',
  		required: true
  	},
    direccion: 'string',
  	cargo: 'string',
  	celular: 'string',
  	telefono_fijo: 'string',
  	fondo_de_pensiones: 'string',
  	arp: {
      model: 'Arp',
      defaultsTo: 0
    },
  	eps: {
      model: 'Eps',
      defaultsTo: 0
    },
  	comentarios: 'text',
  	fecha_de_retiro: 'date',

    addicional_data: 'json',
    clientes: {
      collection: 'Clientes',
      via:'vendedor_asignado'
    },
    contactos: {
      collection: 'Contactos',
      via: 'vendedor_asignado'
    },
    admin: 'boolean',
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
  
  beforeCreate: function(data, cb) {

    PasswordService.hash(data.password, function(hash){

      data.password = hash;

      cb();
      
    })
    
  },

  beforeUpdate: function(data, cb) {
    if(data.password)
      PasswordService.hash(data.password, function(hash){
        data.password = hash;
        cb();
      })
    else 
      return cb();
  },
  comparePassword : function (password, user, cb) {

    if (PasswordService.validate(password, user.password))
      cb(null, true);
    else
      cb({ err: 'No coinciden' })
      // bcrypt.compare(password, user.password, function (err, match) {

      //   if(err) cb(err);
      //   if(match) {
      //     cb(null, true);
      //   } else {
      //     cb(err);
      //   }
      // })
    }
  
};

