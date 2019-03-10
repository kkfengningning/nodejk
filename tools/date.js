var date=new Date();
var y=date.getFullYear();
var m=date.getMonth()+1;
var d=date.getDate();
if(m<10){
    m="0"+m;
}
if(d<10){
    d="0"+d;
}
var today=y+'-'+m+'-'+d;

module.exports=today