
var wget2 = require('wget-improved');
const fs = require('fs');
require('../mysql/mysql');

var group = {
    getgroup_user: function (group,callback) {
      console.log(group.id);
      console.log('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)')
      qq=connection.query('SELECT group_name from t_group where idt_group in (select idt_group from t_group_user where idt_user =?)',[group.id], callback);
      return qq;
    }
}
module.exports = group;
