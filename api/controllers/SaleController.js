module.exports = {

  insertView: function (req, res) {
    console.log(">create record view<");
    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var garden_id = req.param("id");
      var user_id = req.session.userId;
      var user_data = {
        User_id : user_id,
        Garden_id : garden_id
      };
      console.log(user_data);
    }
    return res.view('record/new', { User_Data : user_data } );
  },



  insertSaleRecord: function (req, res) {
    console.log(">insert sale record.<");
    if (req.session.authenticated == null ){
      return res.redirect('/login');
    }else{
      var data = req.allParams();
      console.log(data);

      var sale_data = {
        Total_Sale : req.param("total_sale"),
        Note : req.param("note"),
        User_id : req.param("user_id"),
        Garden_id : req.param("garden_id")
      };

      if (!data){
        console.log("no data");
      }else{
        console.log("data..");
        console.log(sale_data);
        Sales.create(sale_data).exec(function createDB (err, result){
          if (err) {
            console.log(result);
            console.log("error! when insert sale record" + err);
            console.log(sale_data);
            return res.json({ error : err });
          }else {
            console.log("insert successfully.:)");
            return res.redirect('/home');
          }
        });
      }
    }
  }





};
