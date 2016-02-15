/**
* Cotizaciones.js
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
    id_generado:{
        type: 'text'
    },
    cliente: {
    	model: 'Clientes'
    },
    vigencia: {
    	type: 'string',
	},
    vendedor: {
    	model: 'Usuarios',
	},
    fecha_probable_compra: {
    	type: 'date',	
    },
    terminos_de_negociacion: {
    	model: 'TerminosDePago'
    },
    tiempo_de_entrega: {
    	type: 'text'
    },
    probabilidad_de_venta: {
    	type: 'integer'
    },
    ingresos_estimados: {
    	type: 'integer'
    },
    modelo_de_venta: {
    	type: 'string'
    },
    generadaPor: {
    	model: 'Usuarios',
    },
    presupuesto: {
    	type: 'integer'
    },
    contacto: {
    	model: 'Contactos'
    },
    categorias: {
    	collection: 'CategoriasProductos',
        via:'cotizaciones',
        dominant: true
    },
    minuta: {//ASSOC
        model: 'Minuta'
    },
    texto_adicional:{
        type:'text'
    },
    valor_total: {
        type:'integer'
    },
    detalle_total:{
        collection: 'DetalleCotizacion',
        via:'cotizacion'
    },
    detalle: {
        type: 'json'
    },

    mostrar_total: 'boolean',

    vendido: 'boolean'

  },
  afterCreate : function(values,cb){

    if (values.generadaPor != values.vendedor){
        var notificacion = {
            to: values.vendedor,
            text:'Alguien Generó Una Cotización Por Ti',
            href: '/cliente/'+values.cliente+'/!#',
            seen: false,
            type: 2,
        }
        Notifications.create(notificacion).exec(function(err,notificacion){
            sails.sockets.blast('notification',notificacion)
        })
    }

    Usuarios.findOne({id:values.vendedor}).exec(function(err,data){

        var fecha = {}

        function toUppercase(string){
            return string.charAt(0).toUpperCase();
        }

        fecha.dayString = (sails.moment().format('dddd')).charAt(0).toUpperCase() + (sails.moment().format('dddd')).slice(1);

        fecha.dayNumber = sails.moment().format('D')

        fecha.month = (sails.moment().format('MMMM')).charAt(0).toUpperCase() + (sails.moment().format('MMMM')).slice(1)

        fecha.year = sails.moment().format('YYYY')

        var id_cotizacion = "S"+fecha.year+"-0"+ values.id+ toUppercase(data.first_name)+toUppercase(data.last_name);

         Cotizaciones.update({id: values.id},{id_generado:id_cotizacion}).exec(function(err,data){
            console.log(err)
            console.log(data)
         })


        
    })

    var randomDay = Math.floor((Math.random() * 4));

    var seguimiento = {
          cliente: values.cliente,
          estado: 3,
          minuta: 'Se envió cotización al cliente.',
          programar_visita: new Date(values.fecha_probable_compra),
          titulo: "Se envió cotización al cliente.",
          vendedor: values.vendedor,
          contacto: values.contacto
      }
  
    Minuta.create(seguimiento).exec(function(err,minuta){
      if (err) console.log(err)
    })
    cb()
  }

};

