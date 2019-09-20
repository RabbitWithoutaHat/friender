const reqHelpers = {};

reqHelpers.getUserLogin = function (req) {
  return req.user && req.user.login;
};

module.exports = reqHelpers;
