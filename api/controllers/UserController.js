module.exports = {

  createUserView: function (req, res){
    console.log(">CREATE USER VIEW<");
    res.view("user/create");
  },

  insertUser: function (req, res){
    console.log(">INSERT USER<");
    var _name = req.param("name");
    var _password = req.param("password");
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(_name, salt, function(err, hashPassword){
        bcrypt.hash(_password, salt, function(err, hashName){
          _name = hashName;
          _password = hashPassword;

          var user_data = {
            User_Name: req.param("name"),
            User_Last_name: req.param("last_name"),
            User_Email: req.param("email"),
            User_Password: _password,
          };

          console.log(user_data);

          User.create(user_data).exec(function createUser(err, created){
            console.log('Insert user into DB');
            if (err) {
              console.log(err);

            }else{
              return res.view('user/login',{
                User: user_data,
              });
            }
          });
        });
      });
    });
  },

  loginView: function (req, res){
    res.view('user/login');
  },

  verifyUser: function (req, res){

  }

};
