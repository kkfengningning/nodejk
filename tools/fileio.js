const xlsx = require('node-xlsx'); //表格处理插件
const nodeExcel = require('excel-export');

const fileio = {
  //----------------文件导入-------------------
  //获取文件数据函数
  getFile(filePath) {
    return new Promise((resolve, reject) => {
      fileData = xlsx.parse(filePath);
      resolve(fileData);
    })
  },
  //数据处理函数
  dealData(fileData) {
    let arr = [];
    fileData.map((item, index) => {
      if (index !== 0) {
        arr.push({
          "username": String(item[0]),
          "tel": item[1],
          "password": item[2],
          "createdate": String(item[3])
        })
      }
    })
    return arr;
  },

  //----------------文件导出-------------------
  exportdata(_headers, rows) {
    var conf = {}; //定义表格配置
    conf.name = "mysheet"; //工作表名称
    conf.cols = []; //表格列名，也就是表格表头名
    for (var i = 0; i < _headers.length; i++) {
      var col = {};
      col.caption = _headers[i].caption;
      col.type = _headers[i].type;
      conf.cols.push(col);
    }
    conf.rows = rows; //设置表格数据
    var result = nodeExcel.execute(conf); //调用表格生成模块，生成表格
    return result; //将表格返回
  }
}

module.exports = fileio;