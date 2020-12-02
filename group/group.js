
var wget2 = require('wget-improved');
const fs = require('fs');
var conf  = require('../conf/config');

  
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: conf.m_g_host_mysql,
  user:  conf.m_g_mysql_user,
  password: conf.m_g_mysql_password,
  database: conf.m_g_mysql_database,
});

connection.connect(function(err){
  if(err) throw err;
if(!err) {
    console.log("Database is connected ... [OK]");
} else {
    console.log("Error connecting database ... [KO]"+err);
}
});

var group = {
    getgroup_user: function (group,callback) {
      console.log('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)')
      qq=connection.query('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)',[group.userid], callback);
      return qq;
    }
}
module.exports = group;
