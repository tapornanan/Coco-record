module.exports = {

  create: function(req, res){
    console.log(">Create garden view<");

    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var user_id = req.session.userId;
      
      var user_data = {
        User_id : user_id
      };
    }

    console.log(user_data);

    return res.view('garden/create',{ User_Data : user_data });
  },

  insert: function(req, res){
    console.log(">insert garden<");

    var garden_data = {
      User_id: req.param("user_id"),
      Garden_Name: req.param("garden_name"),
      Number_Of_Trees: req.param("garden_no_trees"),
      Garden_Type: req.param("garden_type"),
      Garden_Area: req.param("garden_area"),
    };

    console.log(garden_data);

    Gardens.create(garden_data).exec(function createUser(err, created){
      if (err) {
        console.log(err);
        return res.redirect('garden/create');
      }else{
        console.log('Insert user into DB');
        return res.redirect('/garden');
      }
    });
  }

};
