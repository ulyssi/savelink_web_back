var conf  = require('../../../conf/config');


var mysql    = require('mysql');
connection = mysql.createConnection({
  host: m_i_host_mysql,
  user:  m_i_mysql_user,
  password: m_i_mysql_password,
  database: m_i_mysql_database,
 
});

 
connection.connect(function(err){
  if(err) throw err;
if(!err) {
    console.log("Database is connected ... [OK]");
} else {
    console.log("Error connecting database ... [KO]"+err);
}
});