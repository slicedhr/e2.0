/**
* Proveedores.js
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
    nit: {
    	type: 'string',
    	// required: true,
    	unique: true
    },
    razon_social: {
    	type: 'string',
    	required: true
    },
    representante_legal: {
    	type: 'string',
    },
    responsable_delegado: {
    	type: 'string',
    },
    ciudad: {
    	model:'Ciudades'
    },
    pais: {
    	model:'Paises'
    },
    direccion: {
    	type: 'string',
    },
    telefono_fijo: {
    	type: 'string',
    },
    telefono_fijo_2: {
    	type: 'string',
    },
    celular: {
    	type: 'string',
    },
    email_notificaciones_comerciales: {
    	type: 'email'
    },
    proveedor: {
      collection: 'Productos',
      via: 'proveedor'
    },
    proveedor2: {
      collection: 'Productos',
      via: 'proveedor2'
    },
    proveedor3: {
      collection: 'Productos',
      via: 'proveedor3'
    },
    activado: {
  		type: 'boolean',
  		defaultsTo: true
  	}
  }
};

