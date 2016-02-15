/**
* CC2P.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	categoriacliente: {
       model: 'CategoriaCliente'
    },

    categoriasproductos: {
      collection: 'CategoriasProductos',
      via: 'cc2p',
      dominant: true
    },

  	cliente: {
  		model: 'Clientes'
  	},

  	data: 'boolean',

  }
};

