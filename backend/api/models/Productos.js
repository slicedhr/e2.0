/**
* Productos.js
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
    bodega: {
      model: 'Bodegas',
    },
    nombre: {
      type: 'text'
    },
    unidad_de_medida: {
      type: 'string'
    },
    referencia: {
      type: 'string'
    },
    unidad_de_medida: {
      type: 'string'
    },
    medidas_del_producto: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
    cantidad: {
      type: 'float'
    },
    precio_de_compra: {
      type: 'float'
    },
    utilidad_bruta: {
      type: 'integer'
    },
    iva: {
      type: 'integer'
    },
    categoria: {
      model: 'CategoriasProductos'
    },
    proveedor: {
      model: 'Proveedores'
    },
    proveedor2: {
      model: 'Proveedores'
    },
    proveedor3: {
      model: 'Proveedores'
    },
    descuento: {
      type:'integer'
    },
    descuento_distribuidor: {
      type: 'integer'
    },
    marca: {
      model: 'Marcas'
    },
    tiemposdeentrega: {
      model: 'TiemposDeEntrega'
    },
    activado: {
  		type: 'boolean',
  		defaultsTo: true
  	} 		
  }
};

