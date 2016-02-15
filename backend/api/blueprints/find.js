var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * This adds a content range header to each find response.
 * That allows us to implement a pagination client side.
 */
module.exports = function(req, res) {

  if (actionUtil.parsePk(req)) {
    return require('./findOne')(req, res);
  }

  var Model = actionUtil.parseModel(req),
    where = actionUtil.parseCriteria(req),
    limit = actionUtil.parseLimit(req),
    skip = actionUtil.parseSkip(req),
    sort = actionUtil.parseSort(req),
    query = Model.find().where(where).limit(limit).skip(skip).sort(sort);

  query = actionUtil.populateEach(query, req);
  query.exec(function(error, records) {

    if (error) {
      return res.serverError(error);
    }

    Model.count(where).exec(function(error, count) {

      if (error) {
        return res.serverError(error);
      }

      var metaInfo = {
        start: skip,
        end: limit,
        limit: limit,
        total: count,
      };

      var data = {
        results: records,
        info: metaInfo
      }

      return res.ok(data);
    });
  });
};