/**
* Contactos.js
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
    cliente: {
    	model: 'Clientes'
    },
    nombres_completos: {
    	type: 'string'
    },
    cargo: {
    	type: 'string'
    },
    comentarios: {
    	type: 'text',
    },
    telefono_fijo: {
    	type: 'string',
    },
    celular: {
    	type: 'string',
    },
    direccion: {
    	type: 'string',
    },
    vendedor_asignado: {
        model: 'Usuarios',
    },
    email_empresa: {
        type: 'email'
    },
    email_personal: {
        type: 'email'
    },
    linea_de_producto: {
        model: 'CategoriasProductos',
    },
    minuta: {
        collection:'Minuta',
        via: 'contacto'
    }

  }
};

