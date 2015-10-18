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
    	type: 'string',
    	required: true
    },
    minuta: {
    	type: 'text',
    	required: true
    },
    programar_visita: {
    	type: 'date'
    },
    categoria: {
    	model: 'CategoriasProductos',
    },
    estado: {
    	type: 'integer',
    	required: true
    },
    cliente: {
    	model: 'Clientes',
    },
    contacto: {
        model: 'Contactos',
        defaultsTo: 0
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
    }
  }, 
  afterCreate: function(values,next){
    console.log(values)
    Clientes.update({id:values.cliente},{ultimo_seguimiento: sails.moment().format() }).exec(function(err,cliente){
        var estado = '';
        cliente = cliente[0]
        switch(values.estado){
            case 1:
                estado = ', hay una posible compra.'
            break;
            case 3:
                estado = ', el cliente tenia algo pendiente por aprobar.'
            break;
        }

        var taskData = {
            title: 'Hacer seguimiento a '+cliente.razon_social,
            task: 'Se debe hacer seguimiento a '+cliente.razon_social,
            href: 'cliente/'+values.cliente+'/'+cliente.razon_social,
            to : cliente.vendedor_asignado,
            success: false,
            alarm: new Date(values.programar_visita),
            cliente: cliente.id,
            contacto: values.contacto
        }

        Tasks.create(taskData).exec(function(err,task){
            sails.sockets.blast('task',task)
        })   
    })
    // if (values.estado === 2 || values.estado === 4){

    // };
    
    // Clientes.findOne({id:values.cliente}).exec(function(err,cliente){
        
        
    // })

        next()
  }
};

