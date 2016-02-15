/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */
var prefix = '/api/v1'

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  "GET *": {
    view: 'homepage',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/
  },
  'POST /wilcatec-form':{
    controller: 'WilcatecFormController',
    action: 'create',
    cors: {
     origin: "http://wilcatec.com",
    }
   },
  // 'post /auth/user': 'AuthController.auth',
  // 'post /auth/logout': 'AuthController.logout',
  // '/auth/authenticated': 'AuthController.authenticated',
  'POST /api/v1/auth/login': 'LoginController.logear',
  'POST /api/v1/auth/verify': 'LoginController.verify',
  'GET /api/v1/auth/initialdata': 'LoginController.initialData',
  'GET /api/v1/homedata': 'LoginController.homeData',

  'POST /api/v1/mensajes/seen/:from/:idMessage': 'MensajesController.setSeen',
  'POST /api/v1/usuarios/imagen': 'UsuariosController.uploadImage',
  'PUT /api/v1/usuarios/password': 'UsuariosController.updatePassword',
  'GET /api/v1/mensajes/pendientes': 'MensajesController.getUnread',
  'GET /chat/:from/:to': 'MensajesController.getMessages',
  'GET /api/v1/cotizacion': 'CotizacionesController.getCotizaciones',
  '/cotizacion': 'CotizacionesController.PDF',
  '/cotizacion/:id': 'CotizacionesController.PDFGenerator',

  'GET /api/v1/tareas/obtener': 'TasksController.getTasks',


//   //Actuales
  
//   'GET /api/v1/tasks/actuales/:id':'TasksController.fechasAnterioresPendientes',
//   'GET /api/v1/tasks/actuales/completadas/:id':'TasksController.fechasAnterioresCompletadas',
//   'GET /api/v1/tasks/actuales/todas/:id':'TasksController.fechasAnterioresTodas',

//   //Semana
//   'GET /api/v1/tasks/semana/pendientes/:id':'TasksController.semanaPendientes',
//   'GET /api/v1/tasks/semana/completadas/:id':'TasksController.semanaCompletadas',
//   'GET /api/v1/tasks/semana/todas/:id':'TasksController.semanaTodas',

//   //Mes
//   'GET /api/v1/tasks/mes/pendientes/:id':'TasksController.mesPendientes',
//   'GET /api/v1/tasks/mes/completadas/:id':'TasksController.mesCompletadas',
//   'GET /api/v1/tasks/mes/todas/:id':'TasksController.mesTodas',

// //Año
//   'GET /api/v1/tasks/anio/pendientes/:id':'TasksController.anioPendientes',
//   'GET /api/v1/tasks/anio/completadas/:id':'TasksController.anioCompletadas',
//   'GET /api/v1/tasks/anio/todas/:id':'TasksController.anioTodas',



  'GET /api/v1/clientes/:idVendedor/:pagina': 'ClientesController.getAndPaginate',
  'GET /api/v1/proveedores/:idVendedor/:pagina': 'ProveedoresController.getAndPaginate',
  'GET /api/v1/productos/:idVendedor/:pagina': 'ProductosController.getAndPaginate',
  'GET /api/v1/clientes/obtener/total/:id': 'ClientesController.count',
  'GET /api/v1/clientes/categoria': 'ClientesController.clientesPorCategoria',
  'POST /api/v1/clientes/crear': 'ClientesController.createCustomer',
  'PUT /api/v1/clientes/clientes/multiupdate/:id':'ClientesController.multiupdate',
  'GET /api/v1/consulta-cliente/:id':'ClientesController.consultaCliente',

  'GET /api/v1/perfil/:id':'UsuariosController.getProfile',
  'GET /api/v1/ciudades/pais/:id_pais':'CiudadesController.getByCountry',
  'GET /api/v1/test':
  {
    controller: 'UsuariosController',
    action: 'test',
    populate: false
  },

  'POST /api/v1/registrar-cotizacion': 'CotizacionesController.registrar_cotizacion',
  'GET /api/v1/detalle-cotizacion/:id': 'CotizacionesController.populated_detalle',
  // 'GET /api/v1/cotizaciones': 'CotizacionesController.obtener',
  'POST /api/v1/detallecotizacion': 'CotizacionesController.create_detalle',
  'PUT /api/v1/detallecotizacion/:id': 'CotizacionesController.update_detalle',
  'POST /api/v1/enviar-email': 'CotizacionesController.sendEmail',
  'POST /api/v1/enviar-email-prueba': 'CotizacionesController.sendTestEmail',

  'PUT /api/v1/seguimientos/cancelar/:cliente': 'MinutaController.cancelarSeguimientos',

  'GET /api/v1/contactos/obtener-seguimientos': 'ContactosController.getAndPopulate',
  'GET /api/v1/cliente/sorted': 'ClientesController.clienteSeguimientosOrdenados',
  // 'get /*(^.*)':{
  //   view:'app'
  // }
  // 'get /usuarios': 'UsuariosController.show',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
