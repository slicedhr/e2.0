/**
* Notifications.js
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
  	to: {
  		model: 'Usuarios'
  	},
  	text: 'text',
  	href: 'string',
  	seen: 'boolean',
  	type: 'string',
    /**
     * Notifications Types
     * (1) Se te ha asignado un nuevo cliente
     * (2) Alguien Generó una cotización por ti.
     */
  	addicional: 'json'
  }
  
};

