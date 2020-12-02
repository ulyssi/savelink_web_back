var wget2 = require('wget-improved');
var conf  = require('../conf/config');

const fs = require('fs')

  
var mysql    = require('mysql');
var connection = mysql.createConnection({
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

var URL = {

    geturl: function (callback) {
      qq=connection.query('SELECT *  from t_url order by shortcut', callback);
      return qq;
    },

    geturlraw: function (callback) {
        console.log('URL  get raws ' );
        connection.query("SELECT url,shortcut  FROM t_url", function (err, result, fields) {
          if (err) throw err;
        });
      qq=connection.query('SELECT url,shortcut   from t_url', callback);
      return qq;
    },

    geturlraw_key: function (URL,callback) {
        connection.query("SELECT url,shortcut  FROM t_url", function (err, result, fields) {
          if (err) throw err;
        });
        console.log('GET : key '+ URL.shortcut);
      qq=connection.query('SELECT url,shortcut   from t_url where shortcut=?',[URL.shortcut], callback);
      return qq;
    },

    createurl: function (URL, callback) {
        console.log('CREATE : URL : ' + URL.url +' GO : '+ URL.shortcut);
        var conn=connection.query('Insert into t_url(url, shortcut,id_user) values(?, ?,1)', [URL.url, URL.shortcut], callback);
         var source = 'http://savelink.io:8383/savelink/reload.'+URL.shortcut;
         console.log('URL UPDATE REDIS: ' + source);
      var outputFile = './tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
        return conn;
    },
    updateurl: function (URL, callback) {
      console.log('UPDATE : URL : ' + URL.url +' GO : '+ URL.shortcut);
      
     
      var conn=connection.query('UPDATE t_url set url=? WHERE shortcut = ?', [URL.url,URL.shortcut], callback);
      
      var source = 'http://savelink.io:8383/savelink/reload.'+URL.shortcut;
      console.log('URL UPDATE REDIS: ' + source);
      var outputFile = 'tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
      return conn;
      
    },
    deleteurl: function (URL, callback) {
        return connection.query('DELETE from t_url WHERE id = ?', [URL.id], callback);
    },
    deleteurlbyshortcut: function (URL, callback) {
      console.log('delete : GO : '+ URL.shortcut);
      var con= connection.query('DELETE from t_url WHERE shortcut = ?', [URL.shortcut], callback);
      var source = 'http://savelink.io:8383/savelink/reload.'+URL.shortcut;
      console.log('URL UPDATE REDIS: ' + source);
      var outputFile = 'tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
      return con
    }
}
module.exports = URL;
