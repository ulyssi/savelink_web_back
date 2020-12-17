var wget2 = require('wget-improved');
require('./mysql/mysql');

var url_group = {
    geturl_group: function (callback) {
      return connection.query('SELECT *  from t_url_group order by shortcut', callback);
    },

    geturl_groupraw: function (callback) {
      return connection.query('SELECT url,shortcut   from t_url_group', callback);
    },
    geturl_groupraw_key: function (url_group,callback) {
      return connection.query('SELECT url,shortcut   from t_url_group where shortcut=?',[url_group.shortcut], callback);
    },

    createurl_group: function (url_group, callback) {
        var conn=connection.query('Insert into t_url_group(url, shortcut,id_group)  select ? as url , ? as shortcut, idt_group  from t_group  t  where t.group_name=?', [url_group.url, url_group.shortcut,url_group.group], callback);
         var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
      var outputFile = './tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
        return conn;
    },

    updateurl_group: function (url_group, callback) {
      console.log('UPDATE ??: url_group : ' + url_group.url +' GO : '+ url_group.shortcut);
      
      var conn=connection.query('UPDATE  t_url_group set url=? where shortcut=? AND id_group in ( select idt_group  from t_group  t  where t.group_name=?)', 
      [url_group.url, url_group.shortcut,url_group.group], callback);
         
      var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
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
      var conn=connection.query('DELETE from t_url_group where shortcut=? AND id_group in ( select idt_group  from t_group  t  where t.group_name=?)', 
      [url_group.shortcut,url_group.group], callback);
      var source = 'http://savelink.io:8383/savelink/reload.'+url_group.shortcut;
      var outputFile = 'tmp.html';
      try {
        wget2.download(source, outputFile);
          
       } catch (error) {
          console.error(error);
      }
      return conn;
    }



    





}
module.exports = url_group;
