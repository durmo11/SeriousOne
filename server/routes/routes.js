var tweets = require('../data/twitterUser.json');
function getFeeds(res){
  console.log(tweets);
  res.json(tweets);
};

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all projects
    app.get('/', function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      getFeeds(res);
    });
};
