module.exports = {

  createUserView: function (req, res){
    console.log(">CREATE USER VIEW<");
    res.view("user/create");
  },

  insertUser: function (req, res){
    console.log(">INSERT USER<");
    var _email = req.param("email");
    var _password = req.param("password");
    var bcrypt = require('bcryptjs');

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(_password, salt, function(err, hashPassword){
        bcrypt.hash(_email, salt, function(err, hashEmail){
          _email = hashEmail;
          _password = hashPassword;

          var user_data = {
            User_Name: req.param("name"),
            User_Last_name: req.param("last_name"),
            User_Email: req.param("email"),
            User_Password: _password,
            User_Token: _email,
          };

          console.log(user_data);

          User.create(user_data).exec(function createUser(err, created){
            if (err) {
              console.log(err);
              return res.redirect('user/create');
            }else{
              console.log('Insert user into DB');
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

              // set session
              req.session.userId = result.id;   // returned from a database
              req.session.authenticated = true;
              // res.send(req.session);
              console.log(req.session);


              // return res.view('home',{ User_Data : result });
              return res.redirect('/home');
            }else{
              console.log("Password is not matched");
              return res.json({ error : resultConfirm });
            }
          });
        }
      }
    });

  },

  homepage : function (req, res){
    console.log(">Home page<");
    console.log(req.session.authenticated);
    console.log("user id: " + req.session.userId);
    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var user_id = req.session.userId;
      User.findOne({id: user_id}).populateAll().exec(function (err, result){
        if (err){
          console.log("error! (this user id doesn't exist.)");
          return res.json({ error : err });
        }else{
          if ( result.length != 0 ){
            console.log(result);

            var user_data = {
              User_Name : result.User_Name,
              User_Email : result.User_Email,
              User_id : user_id
            };

            return res.view('home', { User_Data: result });
          }

        }
      });
    }
  },
  logout: function(req, res) {
    console.log(">User logout...<");
      req.session.destroy(function(err) {
           return res.redirect('/');
      });
  }

};
