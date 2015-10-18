/**
* CategoriasProductos.js
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
  	nombre_categoria:{
  		type: 'string',
  		required: true
  	},
    template: {
      type:'text'
    },
    productos: {
      collection: 'Productos',
      via: 'categoria'
    },
    contactos:{
      collection: 'Contactos',
      via: 'linea_de_producto'
    },
    cotizaciones: {
        collection: 'Cotizaciones',
        via:'categorias'
    }
  }
};

