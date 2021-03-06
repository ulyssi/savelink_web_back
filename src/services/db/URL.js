var wget2 = require('wget-improved');
require('./mysql/mysql');

var URL = {
  geturl_user: function (body,callback) {
    return connection.query('SELECT t1.*,t2.uuid  from t_url t1  left join t_user  t2  on t1.id_user=t2.id_user  where t1.id_user in(select id_user from t_user where username=?)order by shortcut  ',[body.id], callback);
  },

  geturlraw: function (callback) {
    return connection.query("SELECT url,concat(t.uuid,'.',shortcut) as shortcut from t_url u inner join t_user t on u.id_user = t.id_user;", callback);
  },
  geturlraw_key: function (body, callback) {
    return connection.query("SELECT url,concat(t.uuid,'.',shortcut)  as shortcut  from t_url u inner join t_user t on u.id_user = t.id_user  where shortcut=?", [body.shortcut], callback);
  },

  createurl: function (body, callback) {
    var conn = connection.query("Insert into t_url(url, shortcut,id_user)   select ? as url , ? as shortcut, id_user   from t_user t  where t.username=?", [body.url.url, body.url.shortcut, body.id], callback);
    
    var source = 'http://'+m_i_url_core_reload 
    //+ URL.shortcut;
    console.log(source);
    var outputFile = './tmp.html';
    try { wget2.download(source, outputFile);
    } catch (error) {console.error(error);}
    return conn;
  },

  updateurl: function (URL, callback) {
    var conn = connection.query('UPDATE t_url set url=? WHERE shortcut = ?', [URL.url, URL.shortcut], callback);
    var source = 'http://'+m_i_url_core_reload 
    //+ URL.shortcut;
    var outputFile = 'tmp.html';
    try { wget2.download(source, outputFile);
    } catch (error) {console.error(error);}
    return conn;

  },

  deleteurl: function (URL, callback) {
    return connection.query('DELETE from t_url WHERE id = ?', [URL.id], callback);
  },

  deleteurlbyshortcut: function (URL, callback) {
    var con = connection.query('DELETE from t_url WHERE shortcut = ?', [URL.shortcut], callback);
    var source = 'http://'+m_i_url_core_reload
    console.log(source);
    // + URL.shortcut;
    var outputFile = 'tmp.html';
    try { wget2.download(source, outputFile);
    } catch (error) {console.error(error);}
    return con;
  }

}
module.exports = URL;
