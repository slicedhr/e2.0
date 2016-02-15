/**
* CategoriaCliente.js
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
    icon: 'string',
    prioridad: 'boolean',
    nombre: 'string',
    color: 'string',
    requireProduct: {
      type: 'boolean',
      defaultsTo: 'false'
    },
    requireContactos: {
      type: 'boolean',
      defaultsTo: 'false'
    }
  }
};

