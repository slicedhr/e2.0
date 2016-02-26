/**
* Descuentos.js
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
  	descuento: {
  		type: 'integer'
  	},
  	producto: {
  		model: 'Productos'
  	},
    categoriacliente:  {
      model: 'CategoriaCliente'
    }
  }
};

