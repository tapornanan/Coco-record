module.exports = {

  createUserView: function (req, res){
    console.log(">CREATE USER VIEW<");
    res.view("user/create");
  },

  insertUser: function (req, res){
    console.log(">INSERT USER<");
    var _name = req.param("name");
    var _password = req.param("password");
    var bcrypt = require('bcryptjs');

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(_password, salt, function(err, hashPassword){
        bcrypt.hash(_name, salt, function(err, hashName){
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

              return res.redirect('/login');
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
    console.log(">Verify User<");
    var email = req.param("email");
    var _password = req.param("password");

    console.log("Email: " + email);
    User.findOne({User_Email: email}).exec(function (err, result){
      if (err){
        console.log("User does not exist.");
        return res.json({ error : err });
      }else{
        console.log("Found user record");
        if ( result.length != 0 ){
          console.log(result);
          var bcrypt = require('bcryptjs');

          bcrypt.compare(_password, result.User_Password, function(err, resultConfirm){
            if ( err ) {
              console.log("Error while checking password.");
              return res.json({ error : err });
            }else if (resultConfirm){
              console.log("Password is correct. Valid user login :)");
              return res.json({ User_Login : result });
            }else{
              console.log("Password is not matched");
              return res.json({ error : resultConfirm });
            }
          });
        }
      }
    });

  }

};
