var express = require('express');
var router = express.Router();
var sql = require('./../tools/sql');

/* GET users listing. */
router.get('/', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  sql.find('back', 'user', {}).then(data => {
    let result = {
      code: 200,
      message: "success",
      data: data
    }
    res.send(result);
  })
})



/* 删除轮播图 */

module.exports = router;