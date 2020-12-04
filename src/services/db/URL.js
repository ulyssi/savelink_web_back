var wget2 = require('wget-improved');
require('./mysql/mysql');

var URL = {
  geturl: function (callback) {
    return connection.query('SELECT *  from t_url order by shortcut', callback);
  },

  geturlraw: function (callback) {
    return connection.query('SELECT url,shortcut   from t_url', callback);
  },
  geturlraw_key: function (URL, callback) {
    return connection.query('SELECT url,shortcut   from t_url where shortcut=?', [URL.shortcut], callback);
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
