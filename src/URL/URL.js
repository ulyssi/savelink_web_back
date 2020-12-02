var wget2 = require('wget-improved');
require('../mysql/mysql');


var URL = {
    

    geturl: function (callback) {
      qq=connection.query('SELECT *  from t_url order by shortcut', callback);
      return qq;
    },

    geturlraw: function (callback) {
      return connection.query('SELECT url,shortcut   from t_url', callback);
    
    },

    geturlraw_key: function (URL,callback) {
      return connection.query('SELECT url,shortcut   from t_url where shortcut=?',[URL.shortcut], callback);
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
