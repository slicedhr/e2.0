/**
* Clientes.js
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
    	type: 'string'
    },
    razon_social: {
    	type: 'text',
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
    region: {
        model:'Regiones'
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
    celular: {
    	type: 'string',
    },
    email: {
    	type: 'email',
        defaultsTo: 'na@na.na'
    },
    comentarios: {
        type: 'text',
    },
    distribuidor: {
        type: 'boolean',
        defaultsTo: false
    },
    natural: {
        type: 'boolean',
        defaultsTo: false
    },
    num_empleados: {
    	type: 'integer',
    },
    website: 'string',
    vendedor_asignado: {
    	model: 'Usuarios',
        defaultsTo: 2
    },
    contactos: {
        collection: 'Contactos',
        via: 'cliente'
    },
    cotizaciones: {
        collection: 'Cotizaciones',
        via: 'cliente'
    },
    seguimientos: {
        collection: 'Minuta',
        via: 'cliente'
    },
    ultimo_seguimiento: {
        type: 'date'
    },
    fecha_asignado: 'date',
    
    activado: {
        type: 'boolean',
        defaultsTo: false
    },

  },
  beforeUpdate: function(data, next){
    if (data.cambio_vendedor){
        notification = {
            to: data.vendedor_asignado,
            text: 'Se te a asignado un nuevo cliente.',
            href: '/cliente/'+data.id+'/!#',
            seen: false,
            type: 1,
            addicional: {}
        }
        Notifications.create(notification).exec(function(err,notification){
            sails.sockets.blast('notification',notification);
        })
    }
    data.fecha_asignado = sails.moment().format();
    next()

  },
  beforeCreate: function(data,next){
    data.fecha_asignado = sails.moment().format();
    data.vendedor_asignado = data.vendedor_asignado || 5
    next()
  },
  afterCreate: function(data,next){
    // notification = {
    //         to: data.vendedor_asignado,
    //         text: 'Se te a asignado un nuevo cliente.',
    //         href: '/cliente/'+data.id+'/!#',
    //         seen: false,
    //         type: 1,
    //         addicional: {}
    //     }
    // Notifications.create(notification).exec(function(err,notification){
    //     sails.sockets.blast('notification',notification);
    // })

    next();
    
  }

};

