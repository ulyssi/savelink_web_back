var wget2 = require('wget-improved');
require('./mysql/mysql');

var url_group = {
    geturl_group: function (callback) {
      return connection.query('SELECT *  from t_url_group order by shortcut', callback);
    },

    geturl_groupraw: function (callback) {
      return connection.query('SELECT url_group,shortcut   from t_url_group', callback);
    },
    geturl_groupraw_key: function (url_group,callback) {
      return connection.query('SELECT url_group,shortcut   from t_url_group where shortcut=?',[url_group.shortcut], callback);
    },

    createurl_group: function (url_group, callback) {
        var conn=connection.query('Insert into t_url_group(url_group, shortcut,id_user) values(?, ?,1)', [url_group.url_group, url_group.shortcut], callback);
         var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
         console.log('url_group UPDATE REDIS: ' + source);
      var outputFile = './tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
        return conn;
    },
    updateurl_group: function (url_group, callback) {
      console.log('UPDATE : url_group : ' + url_group.url_group +' GO : '+ url_group.shortcut);
      
     
      var conn=connection.query('UPDATE t_url_group set url_group=? WHERE shortcut = ?', [url_group.url_group,url_group.shortcut], callback);
      
      var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
      console.log('url_group UPDATE REDIS: ' + source);
      var outputFile = 'tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
      return conn;
      
    },


    deleteurl_group: function (url_group, callback) {
        return connection.query('DELETE from t_url_group WHERE id = ?', [url_group.id], callback);
    },
    deleteurl_groupbyshortcut: function (url_group, callback) {
      console.log('delete : GO : '+ url_group.shortcut);
      var con= connection.query('DELETE from t_url_group WHERE shortcut = ?', [url_group.shortcut], callback);
      var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
      console.log('url_group UPDATE REDIS: ' + source);
      var outputFile = 'tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
      return con
    }



    





}
module.exports = url_group;
