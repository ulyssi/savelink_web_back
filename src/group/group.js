var wget2 = require('wget-improved');
const fs = require('fs');
require('../services/db/mysql/mysql');

var group = {
    getgroup_user: function (group,callback) {
      qq=connection.query('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)',[group.id], callback);
      return qq;
    },
    create_group: function (group,callback) {
      qq=connection.query('INSERT INTO group_name,group_visibility VALUES ( ?,?)',[group.name,group.visibility], callback);
      return qq;
    },
    insert_group_user: function (group,callback) {
      qq=connection.query('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)',[group.id], callback);
      return qq;
    }

}
module.exports = group;
