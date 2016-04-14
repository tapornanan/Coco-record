module.exports = {

  createGardenView: function(req, res){
    var id = req.param("id");
    console.log("User ID : " + id);
    return res.redirect('/garden/create/'+id);
  }
};
