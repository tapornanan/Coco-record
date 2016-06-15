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
  },



  viewSaleRecord: function (req, res) {
    console.log(">View Sale Record...<");

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

      var garden_info = "";
      // get garden data
      Gardens.findOne({id: garden_id}).exec(function(err, res){
        if (err) {
          console.log(err);
          console.log('error!.. while finding garden information');
        }else{
          console.log(res);
          garden_info = {
            Garden_Data : res
          };
        }
      });


      var sale_records = "";
      // get sale record
      Sales.find({User_id: user_id, Garden_id: garden_id}).exec(function(err, data){
        if (err) {
          console.log('error!.. while finding garden sale information');
        }else{
          console.log(data);
          sale_records = {
            Sale_Data : data
          };
        }
      });


      return res.view('record/show', { User_Data: user_data,  Garden_Data: garden_info, Sale_Records: sale_records });
    }



  }





};
