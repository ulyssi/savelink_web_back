var wget2 = require('wget-improved');
require('./mysql/mysql');

var URL = {
  geturl_user: function (body,callback) {
    return connection.query('SELECT *  from t_url  where id_user in(select id_user from t_user where username=?) order by shortcut ',[body.id], callback);
  },

  geturlraw: function (callback) {
    return connection.query("SELECT url,concat(t.uuid,'.',shortcut) as shortcut from t_url u inner join t_user t on u.id_user = t.id_user;", callback);
  },
  geturlraw_key: function (body, callback) {
    return connection.query("SELECT url,concat(t.uuid,'.',shortcut)  as shortcut  from t_url u inner join t_user t on u.id_user = t.id_user  where shortcut=?", [body.shortcut], callback);
  },

  createurl: function (URL, callback) {
    var conn = connection.query('Insert into t_url(url, shortcut,id_user) values(?, ?,1)', [URL.url, URL.shortcut], callback);
    var source = 'http://'+m_i_url_core_reload + URL.shortcut;
    var outputFile = './tmp.html';
    try { wget2.download(source, outputFile);
    } catch (error) {console.error(error);}
    return conn;
  },

  updateurl: function (URL, callback) {
    var conn = connection.query('UPDATE t_url set url=? WHERE shortcut = ?', [URL.url, URL.shortcut], callback);
    var source = 'http://'+m_i_url_core_reload + URL.shortcut;
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
    var source = 'http://'+m_i_url_core_reload + URL.shortcut;
    var outputFile = 'tmp.html';
    try { wget2.download(source, outputFile);
    } catch (error) {console.error(error);}
    return conn;
  }

}
module.exports = URL;
