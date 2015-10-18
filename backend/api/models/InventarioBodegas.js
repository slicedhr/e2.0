 /**
* InventarioBodegas.js
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
    debe_cantidad: {
    	type: 'float'
    },
    haber_cantidad: {	
    	type: 'float'
    },
    total_cantidad: {	
    	type: 'float'
    },
    motivo_de_salida: {
    	type: 'text'
    },
    registrado_por: { //ASSOC
    	type: 'integer'
    }
  }
};

