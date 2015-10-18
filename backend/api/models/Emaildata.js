module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
  	email: {
  		type: 'string',
  		defaultsTo: 'enterprise@wilcatec.com'
  	},
  	password: {
  		type: 'text',
  	},
  	port: {
  		type: 'integer',
  		defaultsTo: 25
  	},
  	host: {
  		type: 'string',
  		defaultsTo: 'mail.wilcatec.com'
  	},
  	id_user: {
  		type: 'integer'
  	}


  },
  beforeCreate: function(values,cb){
    // sails.sockets.blast('areas',values);
    cb()
  }
};