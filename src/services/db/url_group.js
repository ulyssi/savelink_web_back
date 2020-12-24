var wget2 = require('wget-improved');
require('./mysql/mysql');

var url_group = {
  

    geturl_groupall_raw: function (req,callback) {
    return connection.query("SELECT url,concat(uuid,'.',shortcut) as shortcut from ( select url as url,shortcut as shortcut,uuid as uuid from t_url_group u left join t_group_user g on g.idt_group=u.id_group left join t_user us on us.id_user=g.idt_user) as foo where shortcut!=''", callback);
    },
  
    geturl_groupuser: function (req,callback) {
      return connection.query('select group_name,group_visibility,id_group,id_url,c.idt_group,shortcut,url,uuid from  t_url_group a left join t_group b  on a.id_group=b.idt_group left join t_group_user c on b.idt_group=c.idt_group left join t_user d on d.id_user=c.idt_user  where username=? order by group_name,shortcut',[req.id], callback);
    },

    geturl_groupuser_raw: function (req,callback) {
      return connection.query('SELECT group_name,url,shortcut    from  t_url_group a left join t_group b on a.id_group=b.idt_group where id_group in(select  idt_group  from  t_group_user where idt_user in (select id_user from t_user where username=?)) order by group_name,shortcut',[req.id], callback);
    },
    geturl_groupuserraw_key: function (url_group,callback) {
      return connection.query('SELECT group_name,url,shortcut   from  t_url_group a left join t_group b on a.id_group=b.idt_group where shortcut=? AND id_group in(select  idt_group  from  t_group_user where idt_user in (select id_user from t_user where username=?)) order by group_name,shortcut',[url_group.shortcut,url_group.id], callback);
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
