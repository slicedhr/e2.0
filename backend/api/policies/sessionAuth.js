/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var token;

  if (req.headers && req.headers.authorization) {

    var parts = req.headers.authorization.split(' ');

    if (parts.length == 2) {

      	var scheme = parts[0],
            credentials = parts[1];

      	if (/^Bearer$/i.test(scheme)) token = credentials;

    } 	

    else return res.json(401, {err: 'Format is Authorization: Bearer [token]'});

  } else if (req.param('token')) {

    token = req.param('token');

    delete req.query.token;

  } else return res.json(401, {err: 'No Authorization header was found'});

  tokenauth.verify(token, function (err, token) {

    if (err) return res.json(401, {err: 'Invalid Token!'});

    req.token = token;
    
    next();
  });
};
