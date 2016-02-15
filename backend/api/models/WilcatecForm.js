/**
* WilcatecForm.js
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
    nombre: 'text',
    cargo: 'text',
    ciudad: 'string',
    pais: 'string',
    telefono: 'string',
    celular: 'string',
    email: 'string',
    comentarios: 'text',
    ip: 'string',
  },
};

