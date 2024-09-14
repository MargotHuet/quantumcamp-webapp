var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.send({ key: 'value' });
});



module.exports = router;
