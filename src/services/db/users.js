require('./mysql/mysql');

Users = [];
var user = {
    init: function init(){
        this.get_pass(this.get_password);
    },

    create_user: function get_pass(callback) {
        connection.query('', callback);
    },

    delete_user: function get_pass(callback) {
        connection.query('', callback);
    },
    
    update_password: function get_pass(callback) {
        connection.query('', callback);
    },
    
    get_pass: function get_pass(callback) {
        connection.query('SELECT *  from t_user ', callback);
    },


    get_password: function get_password(err, rows) {
        if (err) {
            console.log("Unable to retrieve Password");
        }
        else {
            var arr2 = [];
            arr2 = Array.from(rows);
            arr2.forEach(element => {
                var newUser = { id: element.username, password: element.password };
                Users.push(newUser);
            });
        }
    },

    checkpassword: function checkpassword(req, res) {
        // reload for the next
        this.get_pass(this.get_password);
        var c = 1;
        if (!req.body.id || !req.body.password) {
        } else {
            Users.filter(function (user) {
                if (user.id === req.body.id) {
                    if (user.password === req.body.password) {
                        c = 0;
                    }
                }

            });
        }
        return c;
    }
};

// Gestion des utilisateurs

module.exports = user;


