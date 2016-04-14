module.exports = {

  create: function(req, res){
    var user_data = {User_id : req.param("user_id")};
    console.log(user_data);
    return res.view('/garden/create/',{ User_id : id });
    console.log(user_data);
  }
};
