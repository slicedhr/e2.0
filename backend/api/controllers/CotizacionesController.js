/**
 * CotizacionesController
 *
 * @description :: Server-side logic for managing cotizaciones
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	obtener: function(req,res){

		var criteria = {}

		if (!req.session.user.permissions.admin) criteria.vendedor = req.session.user.id;

		Cotizaciones.find(criteria).populateAll().exec(function(err,cotizaciones){
			if (err) return res.send(err);

			return res.send(cotizaciones)
		})
	},
	create_detalle: function(req,res){
		DetalleCotizacion.create(req.body).exec(function(err,detalle){
			if (err) return res.send(err);

			DetalleCotizacion.findOne({id:detalle.id}).populateAll().exec(function(err,data){
				if (err) return res.send(err);

				return res.send(data)
			})
		})
	},
	update_detalle: function(req,res){
		DetalleCotizacion.update({id:req.param('id')},req.body).exec(function(err,detalle){
			if (err) return res.send(err);

			return res.send(detalle)
		})
	},
	populated_detalle:function(req,res){
		DetalleCotizacion.find({cotizacion:req.param('id')}).populateAll().exec(function(err,detalles){
			if(err) return res.send(err)

			return res.send(detalles)
		})
	},
	registrar_cotizacion: function(req,res){

		Array.prototype.unique=function(a){
		  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
		});
		
		var id_cotizacion;
		var params = req.body

		var categorias = params.categorias.unique() || [];


		var cotizacion_data = {
			cliente: params.cliente,
			vigencia: params.vigencia,
			vendedor: params.vendedor,
			fecha_probable_compra: new Date(params.fecha_probable_compra),
			terminos_de_negociacion: params.terminos_de_negociacion,
			tiempo_de_entrega: params.tiempo_de_entrega,
			ingresos_estimados: params.ingresos_estimados,
			generadaPor: params.generadaPor,
			contacto: params.contacto || 2,
			
			minuta: params.minuta,
			texto_adicional: params.texto_adicional || '',
			valor_total: params.valor_total,

		}
		Cotizaciones.create(cotizacion_data).exec(function(err,cotizacion){

			if (err) return res.send(err);

			id_cotizacion = cotizacion.id

			categorias.forEach(function(categoria,index){
				
			    	cotizacion.categorias.add(categoria)

			   	 cotizacion.save();
			  })
			

			var data_detalle = []

			for (var i = req.body.detalle.length - 1; i >= 0; i--) {
				var temp = req.body.detalle[i]
				detalle = {
				    producto: temp.producto,
				    cantidad: temp.cantidad,
				    precio: temp.precio_de_compra,
				    iva: temp.iva,
				    utilidad_bruta: temp.utilidad_bruta,
				    descuento: temp.descuento,
				    cotizacion:cotizacion.id
				}
				data_detalle.push(detalle)
			};

			DetalleCotizacion.create(data_detalle).exec(function(err,data){
					
				if(err) return res.send(err)

				Cotizaciones.findOne({ id: id_cotizacion }).populateAll().exec(function(err, d){
					if (err) return res.send(err);

					return res.send(d)
				})
				

				
			})
		})		
	},
	get: function(req,res,next){
		var criteria = {}
		if (req.param('vendedor')) criteria.vendedor = req.param('vendedor');
		Cotizaciones.find(criteria).populateAll().exec(function(err, data){
			if (err) return res.send(err);

			return res.send(data)
		})
	},

	PDF: function(req,res,next){
		
	res.locals.layout = 'layoutC';
		return res.view('./cotizacionPDF.ejs',{
	        locals: {
	        	test: 'testtt'
	        },
		});
	},
	PDFGenerator: function(req,res,next){
		
		var fs = require('fs');
		var ejs = require('ejs');
		var pdf = require('html-pdf');
		var id = req.param('id');

		ejs.filters.currency = function (number) {
			number = Math.round(number)
		    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		};

		ejs.filters.firstLetter = function(string){
			return string.charAt(0).toUpperCase();
		}
		Configs.findOne({id:1}).exec(function(err,configs){
			
			configs = configs
		

		Cotizaciones.findOne({id:id}).populateAll().exec(function(err,cotizacion){

			if(err) return res.send(err)

			Clientes.findOne({id:cotizacion.cliente.id}).populateAll().exec(function(err, data){


				if (err) return res.send(err);

				cotizacion.cliente = data
					// console.log(cotizacion)
				DetalleCotizacion.find({cotizacion:cotizacion.id}).populateAll().exec(function(err,detalles){

						if (err) return res.send(err);

						sails.moment.locale('es')
				
				var fecha = {}

				fecha.dayString = (sails.moment().format('dddd')).charAt(0).toUpperCase() + (sails.moment().format('dddd')).slice(1);

				fecha.dayNumber = sails.moment().format('D')

				fecha.month = (sails.moment().format('MMMM')).charAt(0).toUpperCase() + (sails.moment().format('MMMM')).slice(1)

				fecha.year = sails.moment().format('YYYY')

				var html = fs.readFileSync('./views/cotizacionPDF.ejs', 'utf8')

				var rendered = ejs.render(html,{
					locals: {
					layout: 'layoutC',
					data: cotizacion,
					detalles: detalles,
					date: fecha,
					configs: configs
				}})

				var options = {
					format: 'Letter',
					height: "27.94cm",        // allowed units: mm, cm, in, px 
		  			width: "21.59cm",
		  			border: {
		  				top:'1cm',
		  				left:'1.5cm',
		  				right:'1.5cm',
		  				bottom:'0cm',
		  			},
		  			quality: "100", 
					header: {
					    "height": "24mm",
					    "contents": '<img src="http://wilcatec.com/Imagenes/wilcatec2.png" width="278" alt="" />'
					 },
				  	footer: {
				   		"height": "20mm",
				    	// "contents": '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
				    	"contents": '<span style="color:darkblue;text-align:center;font-size:10px;position:relative;"><span style="display:block;height:3px;border: thin solid red;border-left:none;border-right:none;margin-bottom:2px"></span> <center>Oficina: Calle 20# 2-65 Funza, Teléfono: 57-1-8223375, 8266516  Funza – Cundinamarca – Colombia <br>ventas@wilcatec.com, wilcatec.com </center></span><br><span style="color: #444;text-align:center;display:block;margin-top:-6px">{{page}}/{{pages}}</span>'
				  	},
				};
				
				pdf.create(rendered,options).toStream(function(err, stream){
					 fs.readFile(stream.path, function (err,data){
					     res.contentType("application/pdf");
					     return res.send(data);
					  });
				});

				})




			})

			

				
			})


		})

		

		
	},
	sendTestEmail: function(req,res){

			var nodemailer = require('nodemailer'),  smtpPool = require('nodemailer-smtp-pool')

			var data = req.body

			var transporter = smtpPool({
			    host: data.host,
			    port: data.port,
			    auth: {
			        user: data.email,
			        pass: data.password
			    },
			    maxConnections: 5,
			    maxMessages: 10,
			    rateLimit: 5,
			    tls: {
			        rejectUnauthorized: false
			    },

			});

			var transporter = nodemailer.createTransport(transporter);

			var mailOptions = {
				from: data.email,
			    to: data.email,
			    subject: 'Correo de prueba Enterprise',
		        text: 'Correo de prueba Enviado desde Enterprise.',
		    };


			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			       console.log(error);
			       transporter.close()
			       return res.send(error)
			    }else{
			    	console.log('Message sent: ' + info.response);
			    
			       	transporter.close()
			    	return res.send(info)
			    }
			});
		

	},

	sendEmail: function(req,res){

		var nodemailer = require('nodemailer'),  smtpPool = require('nodemailer-smtp-pool'), fs = require('fs'), ejs = require('ejs'), pdf = require('html-pdf');

		var id = req.body.id_cotizacion
		var emaildata = req.body;


		//Filter for Currency
		ejs.filters.currency = function (number) {
			number = Math.round(number)
		    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		};


		//Filter For First Uppercase Letter
		ejs.filters.firstLetter = function(string){
			return string.charAt(0).toUpperCase();
		}

		Configs.findOne({id:1}).exec(function(err,configs){
			
			configs = configs
		

			Cotizaciones.findOne({id:id}).populateAll().exec(function(err,cotizacion){
				if(err) return res.send(err)

				Clientes.findOne({id:cotizacion.cliente.id}).populateAll().exec(function(err, data){

					if (err) return res.send(err);

					var data_template = {
						nombre: data.vendedor_asignado.addicional_data.nombre_firma || '',
						cargo: data.vendedor_asignado.cargo || ''
					}

					cotizacion.cliente = data
						// console.log(cotizacion)
					DetalleCotizacion.find({cotizacion:cotizacion.id}).populateAll().exec(function(err,detalles){

							if (err) return res.send(err);

							sails.moment.locale('es')
					
							var fecha = {}

							fecha.dayString = (sails.moment().format('dddd')).charAt(0).toUpperCase() + (sails.moment().format('dddd')).slice(1);

							fecha.dayNumber = sails.moment().format('D')

							fecha.month = (sails.moment().format('MMMM')).charAt(0).toUpperCase() + (sails.moment().format('MMMM')).slice(1)

							fecha.year = sails.moment().format('YYYY')

							var html = fs.readFileSync('./views/cotizacionPDF.ejs', 'utf8')

							var rendered = ejs.render(html,{
								locals: {
								layout: 'layoutC',
								data: cotizacion,
								detalles: detalles,
								date: fecha,
								configs: configs
							}})

							var options = {
								format: 'Letter',
								height: "27.94cm",        // allowed units: mm, cm, in, px 
					  			width: "21.59cm",
					  			border: {
					  				top:'1cm',
					  				left:'1.5cm',
					  				right:'1.5cm',
					  				bottom:'0cm',
					  			},
					  			quality: "100", 
								header: {
								    "height": "24mm",
								    "contents": '<img src="http://wilcatec.com/Imagenes/wilcatec2.png" width="278" alt="" />'
								 },
							  	footer: {
							   		"height": "20mm",
							    	// "contents": '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
							    	"contents": '<span style="color:darkblue;text-align:center;font-size:10px;position:relative;"><span style="display:block;height:3px;border: thin solid red;border-left:none;border-right:none;margin-bottom:2px"></span> <center>Oficina: Calle 20# 2-65 Funza, Teléfono: 57-1-8223375, 8266516  Funza – Cundinamarca – Colombia <br>ventas@wilcatec.com, wilcatec.com </center></span><br><span style="color: #444;text-align:center;display:block;margin-top:-6px">{{page}}/{{pages}}</span>'
							  	},
							};

							var email_template = fs.readFileSync('./views/emailTemplates/cotizacion.ejs', 'utf8')

							var redered_email_template = ejs.render(email_template,{
								locals: {
								layout: 'layoutEmail',
								data: data_template
							}})
							
							pdf.create(rendered,options).toStream(function(err, stream){
								console.log('PDF CREADO')

								var transporter = smtpPool({
								    host: emaildata.host,
								    port: emaildata.port,
								    auth: {
								        user: emaildata.email,
								        pass: emaildata.password
								    },
								    rateLimit: 5,
								    tls: {
								        rejectUnauthorized: false
								    },

								});

								emaildata.to = cotizacion.cliente.natural ? cotizacion.cliente.email : cotizacion.contacto.email_empresa

								var transporter = nodemailer.createTransport(transporter);
								
								var mailOptions = {
								    from: {
								    	name: data_template.nombre,
								    	address: emaildata.email
								    },
								    to: emaildata.to,
								    cc: {
								    	name: data_template.nombre,
								    	address: emaildata.email
								    },
								    subject: 'Cotización Productos y Servicios WILKATEK',
							        text: 'Gracias por preferir los servicios y/o productos de nuestra compañía. \r\n\r\n En el archivo anexo, usted encontrara la cotización con el producto o servicio solicitado.  \r\n\r\n Cordialmente \r\n\r\n '+ data_template.nombre+'\r\n '+data_template.cargo,
							        html: redered_email_template,
							        attachments: [{  
								        filename: 'cotizacion-producto-o-servicio-wilcatec.pdf',
								        path: stream.path,
								    }]
							    };

								transporter.sendMail(mailOptions, function(error, info){
								    if(error){
								       console.log(error);
			       						transporter.close()

								       return res.send(error)
								    }else{
								    	console.log('Message sent: ' + info.response);
								    
			       						transporter.close()
								    	return res.send(info)
								    }
								});

							});

						})

					})
				
				})


			})

	
	},
};

