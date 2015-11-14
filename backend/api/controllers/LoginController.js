module.exports = {

   logear: function (req, res) {

    var email = req.param('email');

    var password = req.param('password');

    if (!email || !password)
      return res.json(401, {err: 'email and password required'});

    Usuarios.findOne({email: email}, function (err, user) {

      if (!user)
        return res.json(401, {err: 'invalid email or password'});

      Usuarios.comparePassword(password, user, function (err, valid) {

        if (err)
          return res.json(403, {err: 'forbidden'});

        if (!valid)
          return res.json(401, {err: 'invalid email or password'});

        else {

          sails.users[tokenauth.issue({id : user.id })] = user.id

          req.session.user = user

          res.json({

            user: user,

            token: tokenauth.issue({id : user.id })

          });
        }

      });

    })

  },

  verify: function(req, res){

    tokenauth.verify(req.param('token'), function (err, token) {

      if (err) return res.send(401, {err: 'Invalid Token!'});

      req.token = token;

      Usuarios.findOne({ id: token.id }).exec(function (err, user){

        sails.users[tokenauth.issue({id : user.id })] = user.id

        req.session.user = user

        if(err) return res.send(501, {err: 'Error find user!'})

        return res.json(200, {user: user})
      
      })
      

    });

  },

  logout: function(req, res){

  },

  initialData: function(req, res){

    var id = req.param('id'), final_data = {}, isAdmin = req.session.user ? req.session.user.permissions.admin : false;

    if (!req.session.user)
      Usuarios
        .findOne({id:id})
        .then(function(user){

          isAdmin = user.permissions.admin ? true : false

          callall()

        })
        .catch(function(err){
          return res.send(err)
        })
        
    else
      callall()
    


    function callall(){
      ClientesService.count(id, isAdmin)
      .then(getNotificaciones)
      .then(getTasks)
      .then(getMessages)
      .then(function (mensajes){

        final_data.mensajes = mensajes
        return res.send(final_data);

      })
      .catch(function(err){
        console.log(err)
        console.log('err')
        res.send(err)
      })
    }

    function getNotificaciones( total ){

      final_data.total = total

      return Notifications.find( { to: id, seen: false } );
    }

    function getTasks( notificaciones ){

      final_data.notificaciones = notificaciones

      return TaskService
            .tareasPendientes( { which: '', success: false, id: id} );

    }

    function getMessages( tareas ){

      final_data.tareas = tareas

      return Mensajes.find( { to: id, seen: false } )
                      .populate('from')
                      .sort('from ASC')

    }

  }
};