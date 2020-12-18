var wget2 = require('wget-improved');
const fs = require('fs');
require('./mysql/mysql');

var group = {
    getgroup_user: function (group,callback) {
      qq=connection.query('SELECT * from t_group a INNER JOIN t_group_user b on a.idt_group=b.idt_group  where b.idt_user in (  select  id_user from t_user c  where c.username =? ) ',[group.id], callback);
      return qq;
    },
    create_group: function (group,callback) {
      qq=connection.query('INSERT INTO t_group(group_name,group_visibility) VALUES (?,?)',[group.group,group.visibility], callback);
      return qq;
    },
 
    updategroup: function (group,callback) {
      qq=connection.query('UPDATE t_group set group_name=? , group_visibility=? where idt_group=? ',[group.group,group.visibility,group.idt_group], callback);
      return qq;
    },

    deletegroup: function (group,callback) {
      qq=connection.query(' delete from t_group where idt_group=?  ',[group.idt_group], callback);
      return qq;
    },
    
    removeuserfromgroup: function (group,callback) {
      qq=connection.query('delete from t_group_user where idt_user in (select id_user from t_user where username=? )',[group.id], callback);
      return qq;
    },
    

    addusertogroup: function (group,callback) {
      
  
         qq=connection.query(' Insert into t_group_user(idt_user, idt_group , priority ) select id_user,idt_group, ? as priority from t_user LEFT JOIN t_group ON TRUE where username=? AND group_name=?  ',[group.priority,group.id,group.group], callback);
      return qq;
    },





}
module.exports = group;
