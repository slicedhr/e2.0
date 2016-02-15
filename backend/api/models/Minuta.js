/**
* Minuta.js
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
    titulo: {
    	type: 'string'
    },
    minuta: {
    	type: 'text'
    },
    programar_visita: {
    	type: 'date'
    },
    categoria: {
    	model: 'CategoriasProductos',
    },
    estado: {
    	model: 'Estados'
    },
    cliente: {
    	model: 'Clientes',
    },
    contacto: {
        model: 'Contactos'
    },
    vendedor: {
        model: 'Usuarios',
    },
    general: {
        type: 'boolean',
        defaultsTo: false
    },
    cotizar: {
    	type: 'boolean',
        defaultsTo: false
    },
    addicionalData: 'json'
  },
  beforeCreate: function(values, next){


    var dataToUpdate = {    
        ultimo_seguimiento: sails.moment().format(),
        estado: values.estado || 0
    }

    if (values.programar)
        dataToUpdate.seguimientosactivos = true

    Clientes.update({ id: values.cliente }, dataToUpdate)
        .exec(function(err, cliente){
            
            cliente = cliente[0]

            var taskData = {
                title: 'Hacer seguimiento a '+ cliente.razon_social,
                task: 'Se debe hacer seguimiento a ' + cliente.razon_social,
                href: 'cliente/' + values.cliente + '/' + cliente.razon_social,
                to : cliente.vendedor_asignado,
                success: values.programar ? false : true ,
                alarm: new Date(values.programar_visita),
                cliente: cliente.id,
                contacto: values.contacto
            }

            Tasks.create(taskData).exec(function(err,task){

                sails.sockets.blast('task', task)

                next()

            })   
        })


  },
  afterCreate: function(values,next){



    // Clientes.update({id:values.cliente},{ultimo_seguimiento: sails.moment().format() }).exec(function(err,cliente){
    //     var estado = '';
    //     cliente = cliente[0]
    //     switch(values.estado){
    //         case 1:
    //             estado = ', hay una posible compra.'
    //         break;
    //         case 3:
    //             estado = ', el cliente tenia algo pendiente por aprobar.'
    //         break;
    //     }

    //     var taskData = {
    //         title: 'Hacer seguimiento a '+cliente.razon_social,
    //         task: 'Se debe hacer seguimiento a '+cliente.razon_social,
    //         href: 'cliente/'+values.cliente+'/'+cliente.razon_social,
    //         to : cliente.vendedor_asignado,
    //         success: false,
    //         alarm: new Date(values.programar_visita),
    //         cliente: cliente.id,
    //         contacto: values.contacto
    //     }

    //     Tasks.create(taskData).exec(function(err,task){
    //         sails.sockets.blast('task',task)
    //     })   
    // })
    // if (values.estado === 2 || values.estado === 4){

    // };
    
    // Clientes.findOne({id:values.cliente}).exec(function(err,cliente){
        
        
    // })

        next()
  }
};

