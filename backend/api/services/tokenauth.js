var
  jwt = require('jsonwebtoken'),
  tokenSecret = "3BFAEA9FF46DA46DB1C94C851DC96";

module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret,
    {}
  );
};

module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, 
    tokenSecret,
    {},
    callback
  );
};