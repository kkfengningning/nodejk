var express = require('express');
var router = express.Router();
var sql = require('./../tools/sql');
const date = require('./../tools/date');

router.post('/', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  const {
    username,
    password
  } = req.body;
  const tel = 0;

  sql.insert('myvue', 'users', {
    username,
    tel,
    password,
    createdate: date
  }).then(() => {
    res.send("ok")
  })
})


module.exports = router;